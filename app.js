// app.js

let usedQuestions = []; // 解答済みの問題インデックスを記録
let userAnswers = []; // テストモードでのユーザーの解答を保存
let errorCount = {}; // 各問題の間違い回数を記録
let currentQuestionIndex = 0; // 現在の問題のインデックス
let selectedKanjiData = kanjiData; // 選択された問題セット
let quizMode = 'one-by-one'; // 'one-by-one' または 'test'

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
}

/**
 * クイズのメイン画面を準備する
 */
function setupQuizUI() {
    const container = document.getElementById('question-container');
    container.innerHTML = `
        <p id="question"></p>
        <input type="text" id="user-input" placeholder="送り仮名を入力">
        <button id="submit-answer">回答する</button>
        <button id="next-question" style="display: none;">次の問題</button>
    `;

    document.getElementById('submit-answer').addEventListener('click', handleSubmit);
    document.getElementById('user-input').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSubmit();
        }
    });
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
    
    const userInput = document.getElementById('user-input');
    userInput.value = '';
    userInput.disabled = false;
    userInput.focus();
    
    document.getElementById('submit-answer').style.display = 'inline-block';
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
    if (quizMode === 'test') {
        const current = Math.min(usedQuestions.length + 1, total);
        counter.innerText = `${current} / ${total} 問`;
    } else {
        const remaining = total - usedQuestions.length;
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

    if (selectedSet === "kanjiData") {
        selectedKanjiData = kanjiData;
    } else if (selectedSet === "kanjiData1") {
        selectedKanjiData = kanjiData1;
    } else if (selectedSet === "kanjiData2") {
        selectedKanjiData = kanjiData2;
    } else if (selectedSet === "kanjiData3") {
        selectedKanjiData = kanjiData3;
    }

    usedQuestions = [];
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
    if (quizMode === 'test' && usedQuestions.length >= selectedKanjiData.length) {
        showTestResults();
        return;
    }
    if (quizMode === 'one-by-one' && usedQuestions.length >= selectedKanjiData.length) {
        showEndScreen();
        return;
    }

    let nextIndex;
    if (quizMode === 'test') {
        nextIndex = usedQuestions.length;
    } else {
        const weightedList = [];
        selectedKanjiData.forEach((_, i) => {
            if (!usedQuestions.includes(i)) {
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
 * 回答ボタン・Enterキーが押された時の処理
 */
function handleSubmit() {
    const userInput = document.getElementById('user-input');
    const userAnswer = userInput.value; // trim()を削除し、空の入力も許容

    if (quizMode === 'test') {
        userAnswers[currentQuestionIndex] = userAnswer.trim();
        usedQuestions.push(currentQuestionIndex);
        // --- ↓↓↓ ここが最終修正点です！↓↓↓ ---
        // 次の問題を読み込む前に、入力欄をここで確実にクリアします。
        userInput.value = '';
        loadNextQuestion();
    } else {
        // 一問一答モードでは空の回答を無視
        if (userAnswer.trim() === '') return;

        const correctAnswer = selectedKanjiData[currentQuestionIndex].okurigana;
        const isCorrect = userAnswer.trim() === correctAnswer;

        userInput.disabled = true;
        document.getElementById('submit-answer').style.display = 'none';
        document.getElementById('next-question').style.display = 'inline-block';
        document.getElementById('next-question').focus();

        const resultText = document.getElementById('result');
        if (isCorrect) {
            resultText.innerText = '正解です！';
            resultText.className = 'success';
            if (!usedQuestions.includes(currentQuestionIndex)) {
                usedQuestions.push(currentQuestionIndex);
            }
        } else {
            resultText.innerText = `不正解です。正しい送り仮名は「${correctAnswer}」です。`;
            resultText.className = 'error';
            errorCount[currentQuestionIndex]++;
        }
    }
}

/**
 * クイズを最初からやり直す
 */
function restartQuiz() {
    showStartScreen();
}

// --- 初期化 ---
window.onload = showStartScreen;