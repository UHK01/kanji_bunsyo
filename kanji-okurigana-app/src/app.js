let usedQuestions = []; // 出題済みの問題を記録する配列
let incorrectQuestions = []; // 間違えた問題を記録する配列
let currentQuestionIndex = null; // 現在の問題のインデックス
let startTime = null; // 問題が表示された時間を記録

function showStartScreen() {
    document.getElementById("question-container").innerHTML = `
        <h2>漢字の送り仮名クイズ</h2>
        <p>スタートボタンを押してクイズを始めましょう！</p>
        <button id="start-quiz">スタート</button>
    `;

    // スタートボタンのイベントリスナーを追加
    document.getElementById("start-quiz").addEventListener("click", startQuiz);
}

function startQuiz() {
    // クイズ画面を初期化
    document.getElementById("question-container").innerHTML = `
        <p id="question"></p>
        <input type="text" id="user-input" placeholder="送り仮名を入力">
        <button id="submit-answer">回答する</button>
    `;
    document.getElementById("result").innerText = "";

    // 次の問題ボタンを追加
    const nextButton = document.createElement("button");
    nextButton.id = "next-question";
    nextButton.style.display = "none";
    nextButton.innerText = "次の問題";
    nextButton.addEventListener("click", nextQuestion);
    document.getElementById("question-container").appendChild(nextButton);

    // イベントリスナーを設定
    document.getElementById("submit-answer").addEventListener("click", checkAnswer);

    loadQuestion();
}

function loadQuestion() {
    if (usedQuestions.length < kanjiData.length || incorrectQuestions.length > 0) {
        let randomIndex;

        // 解けていない問題を一定の確率で挟む
        if (incorrectQuestions.length > 0 && Math.random() < 0.5) {
            // 間違えた問題からランダムに取得（配列を変更しない）
            randomIndex = incorrectQuestions[Math.floor(Math.random() * incorrectQuestions.length)];
        } else {
            // ランダムなインデックスを取得
            do {
                randomIndex = Math.floor(Math.random() * kanjiData.length);
            } while (usedQuestions.includes(randomIndex)); // 未出題の問題を選ぶ
        }

        // インデックスが正しいか確認
        if (randomIndex >= 0 && randomIndex < kanjiData.length) {
            usedQuestions.push(randomIndex); // 出題済みとして記録
            const currentQuestion = kanjiData[randomIndex];

            document.getElementById("question").innerText = currentQuestion.kanji;
            document.getElementById("user-input").value = "";
            document.getElementById("user-input").disabled = false;
            document.getElementById("result").innerText = "";
            document.getElementById("next-question").style.display = "none";

            currentQuestionIndex = randomIndex;
            startTime = Date.now();
        } else {
            console.error("Invalid randomIndex:", randomIndex);
        }
    } else {
        // クイズ終了時に次の問題ボタンを非表示にする
        const nextButton = document.getElementById("next-question");
        if (nextButton) nextButton.style.display = "none";

        document.getElementById("question-container").innerHTML = `
            <h2>クイズ終了！</h2>
            <p>もう一度挑戦しますか？</p>
            <button id="restart-quiz">最初からやり直す</button>
        `;

        document.getElementById("result").innerText = "";

        document.getElementById("restart-quiz").addEventListener("click", restartQuiz);
    }
}

function checkAnswer() {
    const userAnswer = document.getElementById("user-input").value.trim();
    const correctAnswer = kanjiData[currentQuestionIndex].okurigana;

    // 解答時間を計測
    const elapsedTime = (Date.now() - startTime) / 1000; // 秒単位

    if (elapsedTime > 5) {
        // 時間切れの場合の処理
        document.getElementById("result").innerText = "時間切れです！もう一度挑戦してください。";
        document.getElementById("result").className = "error";

        // 解答状況に「時間切れ」を追加
        updateStatusTable(kanjiData[currentQuestionIndex].kanji, "時間切れ");

        // 時間切れの場合、問題を再度記録
        if (!incorrectQuestions.includes(currentQuestionIndex)) {
            incorrectQuestions.push(currentQuestionIndex);
        }
    } else if (userAnswer === correctAnswer) {
        // 正解時の処理
        document.getElementById("result").innerText = "正解です！";
        document.getElementById("result").className = "success";
        updateStatusTable(kanjiData[currentQuestionIndex].kanji, "正解");

        // 正解した場合、`incorrectQuestions`から削除
        const index = incorrectQuestions.indexOf(currentQuestionIndex);
        if (index !== -1) {
            incorrectQuestions.splice(index, 1);
        }
    } else {
        // 不正解時の処理
        document.getElementById("result").innerText = `不正解です。正しい送り仮名は「${correctAnswer}」です。`;
        document.getElementById("result").className = "error";
        updateStatusTable(kanjiData[currentQuestionIndex].kanji, "不正解");

        // 間違えた問題を記録（重複を防ぐ）
        if (!incorrectQuestions.includes(currentQuestionIndex)) {
            incorrectQuestions.push(currentQuestionIndex);
        }
    }

    // 入力を無効化
    document.getElementById("user-input").disabled = true;
    document.getElementById("next-question").style.display = "block";
}

function nextQuestion() {
    // 次の問題に進む際に「正解です」や「不正解です」のメッセージを消す
    document.getElementById("result").innerText = "";
    loadQuestion();
}

function restartQuiz() {
    usedQuestions = []; // 出題済みリストをリセット
    incorrectQuestions = []; // 間違えた問題リストをリセット

    // 解答状況の表をリセット
    const tableBody = document.querySelector("#status-table tbody");
    tableBody.innerHTML = "";

    showStartScreen(); // スタート画面に戻る
}

function updateStatusTable(question, result) {
    const tableBody = document.querySelector("#status-table tbody");
    const newRow = document.createElement("tr");

    // 問題列
    const questionCell = document.createElement("td");
    questionCell.innerText = question;
    newRow.appendChild(questionCell);

    // 結果列
    const resultCell = document.createElement("td");
    resultCell.innerText = result;
    resultCell.className = result === "正解" ? "success" : "error";
    newRow.appendChild(resultCell);

    tableBody.appendChild(newRow);
}

window.onload = showStartScreen;