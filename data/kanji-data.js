const kanjiData = [
    { kanji: '抑圧', okurigana: 'よくあつ' },
    // { kanji: '滑空', okurigana: 'かっくう' },
    // { kanji: '摂取', okurigana: 'せっしゅ' },
    { kanji: '能吏', okurigana: 'のうり' },
    { kanji: '凝視', okurigana: 'ぎょうし' },
    // { kanji: '勾留', okurigana: 'こうりゅう' },
    // { kanji: '促す', okurigana: 'うなが' },
    // { kanji: '膨らむ', okurigana: 'ふく' },
    // { kanji: '細胞', okurigana: 'さいぼう' },
    // { kanji: '点滅', okurigana: 'てんめつ' },
    // { kanji: '炎天', okurigana: 'えんてん' },
    { kanji: '礎石', okurigana: 'そせき' },
    // { kanji: '幼稚', okurigana: 'ようち' },
    // { kanji: '抜粋', okurigana: 'ばっすい' },
    // { kanji: '潜る', okurigana: 'もぐ' },
    { kanji: '稲穂', okurigana: 'いなほ' },
    { kanji: '煩雑', okurigana: 'はんざつ' },
    { kanji: '煩悩', okurigana: 'ぼんのう' },
    // { kanji: '悪霊', okurigana: 'あくりょう' },
    { kanji: '好悪', okurigana: 'こうお' },
    { kanji: '成就', okurigana: 'じょうじゅ' },
    { kanji: '去就', okurigana: 'きょしゅう' },
    // { kanji: '供給', okurigana: 'きょうきゅう' },
    { kanji: '供養', okurigana: 'くよう' },
    { kanji: '殺伐', okurigana: 'さつばつ' },
    { kanji: '相殺', okurigana: 'そうさい' },
    { kanji: '施政', okurigana: 'しせい' },
    { kanji: '布施', okurigana: 'ふせ' },
    // { kanji: '懸賞', okurigana: 'けんしょう' },
    // { kanji: '懸念', okurigana: 'けねん' },
    { kanji: '空虚', okurigana: 'くうきょ' },
    { kanji: '虚空', okurigana: 'こくう' },
];
function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}
document.getElementById("submit-answer").addEventListener("click", checkAnswer); document.getElementById("next-question").addEventListener("click", nextQuestion); window.onload = loadQuestion;