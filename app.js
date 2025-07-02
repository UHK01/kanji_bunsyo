// app.js

let usedQuestions = []; // 解答済みの問題インデックスを記録
let incorrectQuestions = []; // 間違えた問題を記録する配列
let userAnswers = []; // テストモードでのユーザーの解答を保存
let errorCount = {}; // 各問題の間違い回数を記録
let currentQuestionIndex = 0; // 現在の問題のインデックス
let selectedKanjiData = kanjiData; // 実際にクイズで使われるフィルタリング済みの問題リスト
let originalKanjiData = kanjiData; // 選択された問題セットのオリジナル（全データ）
let quizMode = 'one-by-one'; // 'one-by-one', 'test', 'multiple-choice'

// --- 画面要素を更新する関数群 ---

/**
 * スタート画面を表示する
 */
function showStartScreen() {
    const container = document.getElementById('question-container');
    container.innerHTML = `
        <h2>漢字の送り仮名クイズ</h2>
        <div>
            <p>クイズ形式を選択してください。</p>
            <label><input type="radio" name="quiz-mode" value="one-by-one" checked> 一問一答</label>
            <label><input type="radio" name="quiz-mode" value="test"> テスト形式</label>
            <label><input type="radio" name="quiz-mode" value="multiple-choice"> 選択式</label>
        </div>
        <div>
            <p>問題セットを選択してください。</p>
            <select id="question-set">
                <option value="kanjiData">問題1</option>
                <option value="kanjiData1">問題2</option>
                <option value="kanjiData2">問題3</option>
                <option value="kanjiData3">問題4</option>
            </select>
        </div>
        <button id="start-quiz">スタート</button>
    `;

    // 他の表示エリアをリセット
    document.getElementById('remaining-counter').innerText = '';
    document.getElementById('result').innerText = '';
    document.querySelector('#status-table tbody').innerHTML = '';

    document.getElementById('start-quiz').addEventListener('click', startQuiz);

    // --- ↓↓↓ ここからが新しいロジックです！ ↓↓↓ ---
    const questionSetSelector = document.getElementById('question-set');
    // 問題セットセレクターが変更されたら、利用可能なクイズモードを更新する
    questionSetSelector.addEventListener('change', updateAvailableModes);
    // 初期表示時にも一度実行
    updateAvailableModes();
    // --- ↑↑↑ 修正ここまで ↑↑↑ ---
}

/**
 * ★ 新しい関数：問題セットに応じて利用可能なクイズモードのUIを更新する
 */
function updateAvailableModes() {
    const selectedSet = document.getElementById('question-set').value;
    const config = kanjiDataConfig[selectedSet] || { availableModes: ['one-by-one', 'test', 'multiple-choice'] };
    const availableModes = config.availableModes;
    
    let firstAvailableMode = null;

    document.querySelectorAll('input[name="quiz-mode"]').forEach(radio => {
        if (availableModes.includes(radio.value)) {
            radio.disabled = false;
            radio.parentElement.style.color = 'black'; // 文字色を黒に
            if (!firstAvailableMode) {
                firstAvailableMode = radio; // 最初に利用可能なモードを記憶
            }
        } else {
            radio.disabled = true;
            radio.parentElement.style.color = 'grey'; // 文字色をグレーに
        }
    });

    // 現在チェックされているモードが利用不可になった場合、最初に利用可能なモードにチェックを付け直す
    const checkedRadio = document.querySelector('input[name="quiz-mode"]:checked');
    if (checkedRadio && checkedRadio.disabled && firstAvailableMode) {
        firstAvailableMode.checked = true;
    }
}


/**
 * クイズのメイン画面の骨格を準備する
 */
function setupQuizUI() {
    const container = document.getElementById('question-container');
    container.innerHTML = `
        <p id="question"></p>
        <div id="answer-area"></div>
        <p id="result"></p>
        <button id="next-question" style="display: none;">次の問題</button>
    `;
    document.getElementById('next-question').addEventListener('click', () => loadNextQuestion());
}

/**
 * 特定の問題を画面に表示する
 * @param {number} index - 表示する問題のインデックス
 */
function displayQuestion(index) {
    currentQuestionIndex = index;
    const question = selectedKanjiData[index];
    document.getElementById('question').innerText = question.kanji;
    
    const answerArea = document.getElementById('answer-area');
    
    if (quizMode === 'multiple-choice') {
        const choices = generateChoices(question.okurigana, originalKanjiData);
        answerArea.innerHTML = ''; 
        choices.forEach(choice => {
            const button = document.createElement('button');
            button.className = 'choice-btn';
            button.innerText = choice;
            button.addEventListener('click', handleChoiceSelection);
            answerArea.appendChild(button);
        });
    } else { 
        answerArea.innerHTML = `
            <input type="text" id="user-input" placeholder="送り仮名を入力">
            <button id="submit-answer">回答する</button>
        `;
        document.getElementById('submit-answer').addEventListener('click', handleSubmit);
        const userInput = document.getElementById('user-input');
        userInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                handleSubmit();
            }
        });
        userInput.focus();
    }
    
    document.getElementById('next-question').style.display = 'none';
    document.getElementById('result').innerText = '';
    updateRemainingCounter();
}

/**
 * 残り問題数の表示を更新する
 */
function updateRemainingCounter() {
    const counter = document.getElementById('remaining-counter');
    const total = selectedKanjiData.length;
    let current;
    if (quizMode === 'test') {
        current = Math.min(usedQuestions.length + 1, total);
        counter.innerText = `${current} / ${total} 問`;
    } else { 
        const correctCount = usedQuestions.filter(qIndex => !incorrectQuestions.includes(qIndex)).length;
        const remaining = total - correctCount;
        counter.innerText = remaining > 0 ? `のこり ${remaining} もん` : '全問正解！';
    }
}


/**
 * クイズの終了画面を表示する
 */
function showEndScreen() {
    const container = document.getElementById('question-container');
    container.innerHTML = `
        <h2>クイズ終了！</h2>
        <p>お疲れ様でした！</p>
        <button id="restart-quiz">もう一度挑戦する</button>
    `;
    container.querySelector('#restart-quiz').addEventListener('click', restartQuiz);
    document.getElementById('remaining-counter').innerText = '全問クリア！おめでとう！';
}

/**
 * テスト結果を表示する
 */
function showTestResults() {
    document.getElementById('question-container').innerHTML = '';
    document.getElementById('remaining-counter').innerText = 'テスト結果';

    let correctCount = 0;
    const tableBody = document.querySelector('#status-table tbody');
    tableBody.innerHTML = '';

    selectedKanjiData.forEach((question, index) => {
        const isCorrect = userAnswers[index] === question.okurigana;
        if (isCorrect) correctCount++;
        
        const row = tableBody.insertRow();
        row.insertCell(0).innerText = question.kanji;
        const resultCell = row.insertCell(1);
        resultCell.className = isCorrect ? 'success' : 'error';
        resultCell.innerHTML = isCorrect ? '正解' : `不正解 (あなたの答え: ${userAnswers[index] || '無解答'}, 正解: ${question.okurigana})`;
    });

    const result = document.getElementById('result');
    result.innerHTML = `
        <h2>テスト終了！</h2>
        <p>正解数: ${correctCount} / ${selectedKanjiData.length}</p>
        <button id="restart-quiz">もう一度挑戦する</button>
    `;
    result.querySelector('#restart-quiz').addEventListener('click', restartQuiz);
}

// --- クイズのロジックを管理する関数群 ---

/**
 * クイズを開始する
 */
function startQuiz() {
    quizMode = document.querySelector('input[name="quiz-mode"]:checked').value;
    const selectedSet = document.getElementById('question-set').value;

    if (selectedSet === "kanjiData") originalKanjiData = kanjiData;
    else if (selectedSet === "kanjiData1") originalKanjiData = kanjiData1;
    else if (selectedSet === "kanjiData2") originalKanjiData = kanjiData2;
    else if (selectedSet === "kanjiData3") originalKanjiData = kanjiData3;
    
    if (quizMode === 'one-by-one' || quizMode === 'test') {
        selectedKanjiData = originalKanjiData.filter(q => !q.multipleChoiceOnly);
    } else {
        selectedKanjiData = originalKanjiData;
    }

    usedQuestions = [];
    incorrectQuestions = [];
    userAnswers = Array(selectedKanjiData.length).fill(null);
    errorCount = {};
    selectedKanjiData.forEach((_, i) => { errorCount[i] = 0; });
    
    setupQuizUI();
    loadNextQuestion();
}

/**
 * 次の問題を読み込む
 */
function loadNextQuestion() {
    const isQuizFinished = (quizMode === 'test' && usedQuestions.length >= selectedKanjiData.length) ||
                           (quizMode !== 'test' && usedQuestions.filter(q => !incorrectQuestions.includes(q)).length >= selectedKanjiData.length);

    if (isQuizFinished) {
        quizMode === 'test' ? showTestResults() : showEndScreen();
        return;
    }

    let nextIndex;
    if (quizMode === 'test') {
        nextIndex = usedQuestions.length;
    } else { 
        const weightedList = [];
        selectedKanjiData.forEach((_, i) => {
            if (!usedQuestions.includes(i) || incorrectQuestions.includes(i)) {
                const weight = 1 + (errorCount[i] || 0) * 5;
                for (let j = 0; j < weight; j++) weightedList.push(i);
            }
        });
        if (weightedList.length === 0) {
            showEndScreen();
            return;
        }
        nextIndex = weightedList[Math.floor(Math.random() * weightedList.length)];
    }
    
    displayQuestion(nextIndex);
}

/**
 * テキスト入力での回答を処理する
 */
function handleSubmit() {
    const userInput = document.getElementById('user-input');
    // 回答済みの場合は何もしない
    if (userInput.disabled) {
        return;
    }
    const userAnswer = userInput.value.trim();

    if (quizMode === 'test') {
        if (userAnswer === '') { 
             userAnswers[currentQuestionIndex] = '';
        } else {
            userAnswers[currentQuestionIndex] = userAnswer;
        }
        usedQuestions.push(currentQuestionIndex);
        loadNextQuestion();
    } else { 
        if (userAnswer === '') return;
        handleAnswer(userAnswer);
    }
}

/**
 * 選択肢クリックでの回答を処理する
 */
function handleChoiceSelection(event) {
    const userAnswer = event.target.innerText;
    
    document.querySelectorAll('.choice-btn').forEach(btn => {
        btn.disabled = true;
    });

    handleAnswer(userAnswer);
}

/**
 * 正誤判定と画面更新を行う (共通処理)
 */
function handleAnswer(userAnswer) {
    // 回答後に再度入力できないように入力欄とボタンを無効化する
    const userInput = document.getElementById('user-input');
    if (userInput) {
        userInput.disabled = true;
    }
    const submitButton = document.getElementById('submit-answer');
    if (submitButton) {
        submitButton.disabled = true;
    }
    
    const correctAnswer = selectedKanjiData[currentQuestionIndex].okurigana;
    const isCorrect = userAnswer === correctAnswer;
    const resultText = document.getElementById('result');

    if (isCorrect) {
        resultText.innerText = '正解です！';
        resultText.className = 'success';
        if (!usedQuestions.includes(currentQuestionIndex)) {
            usedQuestions.push(currentQuestionIndex);
        }
        const incorrectIndex = incorrectQuestions.indexOf(currentQuestionIndex);
        if (incorrectIndex > -1) {
            incorrectQuestions.splice(incorrectIndex, 1);
        }
    } else {
        resultText.innerText = `不正解です。正しい送り仮名は「${correctAnswer}」です。`;
        resultText.className = 'error';
        errorCount[currentQuestionIndex] = (errorCount[currentQuestionIndex] || 0) + 1;
        if (!incorrectQuestions.includes(currentQuestionIndex)) {
            incorrectQuestions.push(currentQuestionIndex);
        }
    }
    
    document.getElementById('next-question').style.display = 'inline-block';
    document.getElementById('next-question').focus();
    updateRemainingCounter();
}


/**
 * クイズを最初からやり直す
 */
function restartQuiz() {
    showStartScreen();
}

/**
 * 選択肢を生成する
 */
function generateChoices(correctAnswer, allData) {
    let choices = [correctAnswer];
    
    const wrongAnswers = allData
        .map(item => item.okurigana)
        .filter(okurigana => okurigana !== correctAnswer && okurigana.trim() !== '');

    const shuffledWrong = wrongAnswers.sort(() => 0.5 - Math.random());
    for (let i = 0; i < Math.min(3, shuffledWrong.length); i++) {
        choices.push(shuffledWrong[i]);
    }
    
    return choices.sort(() => 0.5 - Math.random());
}

// --- 初期化 ---
window.onload = showStartScreen;