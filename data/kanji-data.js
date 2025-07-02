const kanjiData = [
    // { kanji: '訴訟', okurigana: 'そしょう' },
    // { kanji: '風鈴', okurigana: 'ふうりん' },
    // { kanji: '頑丈', okurigana: 'がんじょう' },
    { kanji: '醜聞', okurigana: 'しゅうぶん' },
    { kanji: '享楽', okurigana: 'きょうらく' },
    { kanji: '宰相', okurigana: 'さいしょう' },
    // { kanji: '献立', okurigana: 'こんだて' },
    { kanji: '憤り', okurigana: 'いきどお' },
    { kanji: '教諭', okurigana: 'きょうゆ' },
    { kanji: '感銘', okurigana: 'かんめい' },
    // { kanji: '実践', okurigana: 'じっせん' },
    { kanji: '荘重', okurigana: 'そうちょう' },
    // { kanji: '無駄', okurigana: 'むだ' },
    // { kanji: '補充', okurigana: 'ほじゅう' },
    // { kanji: '砕け', okurigana: 'くだ' },
    // { kanji: '戻る', okurigana: 'もど' },
    // { kanji: '滑らか', okurigana: 'なめ' },
    // { kanji: '滑り', okurigana: 'すべ' },
    { kanji: '覆す', okurigana: 'くつがえ' },
    { kanji: '覆う', okurigana: 'おお' },
    { kanji: '怠る', okurigana: 'おこた' },
    // { kanji: '怠ける', okurigana: 'なま' },
    // { kanji: '締める', okurigana: 'し' },
    { kanji: '絞る', okurigana: 'しぼ' },
    // { kanji: '焦げる', okurigana: 'こ' },
    // { kanji: '焦る', okurigana: 'あせ' },
    { kanji: '潜む', okurigana: 'ひそ' },
    { kanji: '潜る', okurigana: 'もぐ' },
    // { kanji: '弾む', okurigana: 'はず' },
    // { kanji: '弾く', okurigana: 'ひ' },
    { kanji: '占める', okurigana: 'し' },
    // { kanji: '占う', okurigana: 'うらな' }
];
const kanjiData1 = [
    { kanji: '訴訟', okurigana: 'そしょう' },
    { kanji: '風鈴', okurigana: 'ふうりん' },
    { kanji: '頑丈', okurigana: 'がんじょう' },
    { kanji: '醜聞', okurigana: 'しゅうぶん' },
    { kanji: '享楽', okurigana: 'きょうらく' },
    { kanji: '宰相', okurigana: 'さいしょう' },
    { kanji: '献立', okurigana: 'こんだて' },
    { kanji: '憤り', okurigana: 'いきどお' },
    { kanji: '教諭', okurigana: 'きょうゆ' },
    { kanji: '感銘', okurigana: 'かんめい' },
    { kanji: '実践', okurigana: 'じっせん' },
    { kanji: '荘重', okurigana: 'そうちょう' },
    { kanji: '無駄', okurigana: 'むだ' },
    { kanji: '補充', okurigana: 'ほじゅう' },
    { kanji: '砕け', okurigana: 'くだ' },
    { kanji: '戻る', okurigana: 'もど' },
    { kanji: '滑らか', okurigana: 'なめ' },
    { kanji: '滑り', okurigana: 'すべ' },
    { kanji: '覆す', okurigana: 'くつがえ' },
    { kanji: '覆う', okurigana: 'おお' },
    { kanji: '怠る', okurigana: 'おこた' },
    { kanji: '怠ける', okurigana: 'なま' },
    { kanji: '締める', okurigana: 'し' },
    { kanji: '絞る', okurigana: 'しぼ' },
    { kanji: '焦げる', okurigana: 'こ' },
    { kanji: '焦る', okurigana: 'あせ' },
    { kanji: '潜む', okurigana: 'ひそ' },
    { kanji: '潜る', okurigana: 'もぐ' },
    { kanji: '弾む', okurigana: 'はず' },
    { kanji: '弾く', okurigana: 'ひ' },
    { kanji: '占める', okurigana: 'し' },
    { kanji: '占う', okurigana: 'うらな' }
];
const kanjiData2 = [
    { kanji: '', okurigana: '' },
];

const kanjiData3 = [
    { kanji: '', okurigana: '' },
]
function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}

const kanjiDataConfig = {
    kanjiData: {
        // 'kanjiData' は設定がないので、全てのモードで利用可能
        // （ただし、個別の問題に multipleChoiceOnly: true があればそれに従う）
        availableModes: ['one-by-one', 'test', 'multiple-choice']
    },
    kanjiData1: {
        // 'kanjiData1' は「選択式」専用
        availableModes: ['one-by-one', 'test', 'multiple-choice']
    },
    kanjiData2: {
        // 'kanjiData2' は「一問一答」と「テスト」専用
        availableModes: ['one-by-one', 'test', 'multiple-choice']
    },
    kanjiData3: {
        // 'kanjiData3' は設定がないので、全てのモードで利用可能
        availableModes: ['one-by-one', 'test', 'multiple-choice']
    }
};

document.getElementById("submit-answer").addEventListener("click", checkAnswer); document.getElementById("next-question").addEventListener("click", nextQuestion); window.onload = loadQuestion;