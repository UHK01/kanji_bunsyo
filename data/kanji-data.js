const kanjiData = [
    { kanji: '吉凶', okurigana: 'きっきょう' },
    { kanji: '遺漏', okurigana: 'いろう' },
    { kanji: '胎動', okurigana: 'たいどう' },
    { kanji: '楼閣', okurigana: 'ろうかく' },
    { kanji: '擁護', okurigana: 'ようご' },
    { kanji: '肝胆', okurigana: 'かんたん' },
    { kanji: '控え', okurigana: 'ひか' },
    { kanji: '潤う', okurigana: 'うるお' },
    { kanji: '施設', okurigana: 'しせつ' },
    { kanji: '撮影', okurigana: 'さつえい' },
    { kanji: '緊急', okurigana: 'きんきゅう' },
    { kanji: '漂流', okurigana: 'ひょうりゅう' },
    { kanji: '特殊', okurigana: 'とくしゅ' },
    { kanji: '密猟', okurigana: 'みつりょう' },
    { kanji: '伏せ', okurigana: 'ふ' },
    { kanji: '悟る', okurigana: 'さと' },
    { kanji: '見る', okurigana: 'み' },
    { kanji: '診る', okurigana: 'み' },
    { kanji: '整う', okurigana: 'ととの' },
    { kanji: '調う', okurigana: 'ととの' },
    { kanji: '冒して', okurigana: 'おか' },
    { kanji: '犯す', okurigana: 'おか' },
    { kanji: '侵す', okurigana: 'おか' },
    { kanji: '勧める', okurigana: 'すす' },
    { kanji: '進める', okurigana: 'すす' },
    { kanji: '薦める', okurigana: 'すす' },
    { kanji: '立つ', okurigana: 'た' },
    { kanji: '裁つ', okurigana: 'た' },
    { kanji: '絶つ', okurigana: 'た' },
    { kanji: '遭う', okurigana: 'あ' },
    { kanji: '合う', okurigana: 'あ' },
    { kanji: '会う', okurigana: 'あ' },
];
const kanjiData1 = [
    { kanji: '嫌でもなさそう\nあいにく,案の定,おさおさ,こもごも,さしあたり,さぞ,すこぶる,とうてい,まにまに,まんざら,みすみす,よもや', okurigana: 'まんざら' },
    { kanji: '取り逃がす\nあいにく,案の定,おさおさ,こもごも,さしあたり,さぞ,すこぶる,とうてい,まにまに,まんざら,みすみす,よもや', okurigana: 'みすみす' },
    { kanji: '私はその日仕事が入っています\nあいにく,案の定,おさおさ,こもごも,さしあたり,さぞ,すこぶる,とうてい,まにまに,まんざら,みすみす,よもや', okurigana: 'あいにく' },
    { kanji: '彼にかなうはずがない\nあいにく,案の定,おさおさ,こもごも,さしあたり,さぞ,すこぶる,とうてい,まにまに,まんざら,みすみす,よもや', okurigana: 'とうてい' },
    { kanji: 'これで間に合う\nあいにく,案の定,おさおさ,こもごも,さしあたり,さぞ,すこぶる,とうてい,まにまに,まんざら,みすみす,よもや', okurigana: 'さしあたる' },
    { kanji: '悔しい思い\nあいにく,案の定,おさおさ,こもごも,さしあたり,さぞ,すこぶる,とうてい,まにまに,まんざら,みすみす,よもや', okurigana: 'さぞ' },
    { kanji: '機嫌がよい\nあいにく,案の定,おさおさ,こもごも,さしあたり,さぞ,すこぶる,とうてい,まにまに,まんざら,みすみす,よもや', okurigana: 'すこぶる' },
    { kanji: '彼からは返事が来なかった\nあいにく,案の定,おさおさ,こもごも,さしあたり,さぞ,すこぶる,とうてい,まにまに,まんざら,みすみす,よもや', okurigana: '案の定' },
    { kanji: '反対されるとは\nあいにく,案の定,おさおさ,こもごも,さしあたり,さぞ,すこぶる,とうてい,まにまに,まんざら,みすみす,よもや', okurigana: 'よもや' },
    { kanji: '用意（）怠りなく\nあいにく,案の定,おさおさ,こもごも,さしあたり,さぞ,すこぶる,とうてい,まにまに,まんざら,みすみす,よもや', okurigana: 'おさおさ' },
    { kanji: '悲喜（）の卒業式\nあいにく,案の定,おさおさ,こもごも,さしあたり,さぞ,すこぶる,とうてい,まにまに,まんざら,みすみす,よもや', okurigana: 'こもごも' },
    { kanji: '波の（）漂っている\nあいにく,案の定,おさおさ,こもごも,さしあたり,さぞ,すこぶる,とうてい,まにまに,まんざら,みすみす,よもや', okurigana: 'まにまに' },
];
const kanjiData2 = [
    { kanji: '明鏡止水\n虚心坦懐,右往左往,得手勝手,終始一貫,意志薄弱,自由自在', okurigana: '虚心坦懐' },
    { kanji: '周章狼狽\n虚心坦懐,右往左往,得手勝手,終始一貫,意志薄弱,自由自在', okurigana: '右往左往' },
    { kanji: '傍若無人\n虚心坦懐,右往左往,得手勝手,終始一貫,意志薄弱,自由自在', okurigana: '得手勝手' },
    { kanji: '徹頭徹尾\n虚心坦懐,右往左往,得手勝手,終始一貫,意志薄弱,自由自在', okurigana: '終始一貫' },
    { kanji: '優柔不断\n虚心坦懐,右往左往,得手勝手,終始一貫,意志薄弱,自由自在', okurigana: '意志薄弱' },
    { kanji: '縦横無尽\n虚心坦懐,右往左往,得手勝手,終始一貫,意志薄弱,自由自在', okurigana: '自由自在' },
]

const kanjiData3 = [
    { kanji: 'え', okurigana: 'e' },
]
function nextQuestion() {
    currentQuestionIndex++;
    loadQuestion();
}
document.getElementById("submit-answer").addEventListener("click", checkAnswer); document.getElementById("next-question").addEventListener("click", nextQuestion); window.onload = loadQuestion;