const kanjiData = [
    { kanji: '1', okurigana: '1' },,
    { kanji: '2', okurigana: '2' },
    { kanji: '3', okurigana: '3' },
    { kanji: '4', okurigana: '4' }
];function nextQuestion() {    currentQuestionIndex++;    loadQuestion();}document.getElementById("submit-answer").addEventListener("click", checkAnswer);document.getElementById("next-question").addEventListener("click", nextQuestion);window.onload = loadQuestion;