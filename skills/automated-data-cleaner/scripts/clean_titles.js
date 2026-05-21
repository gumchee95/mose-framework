/**
 * scripts/clean_titles.js
 * 職位名稱自動纠錯與標準化模組
 */

const TYPO_MAP = {
    "asistant": "assistant",
    "asistance": "assistant",
    "asist": "assistant",
    "enginee": "engineer",
    "enginner": "engineer",
    "enginer": "engineer",
    "acc ": "account ",
    "acct": "account",
    "acturial": "actuarial",
    "acturail": "actuarial",
    "assiociate": "associate",
    "assocaite": "associate",
    "beutician": "beautician",
    "dietetion": "dietitian",
    "outsoursing": "outsourcing",
    "annonator": "annotator",
    "jurutera": "engineer",
    "pekerja": "worker",
    "guru": "teacher",
    "akauntan": "accountant"
};

/**
 * 清理函數
 * @param {string} title 
 * @returns {string}
 */
function cleanTitle(title) {
    if (!title) return "";

    // 1. 基本清洗
    let cleaned = title
        .trim()
        .toLowerCase()
        .replace(/[#!*()]/g, "") // 移除多余標點
        .replace(/\s+/g, " ");   // 合併空格

    // 2. 詞典糾錯 (Regex 版以保證邊界)
    for (const [typo, correct] of Object.entries(TYPO_MAP)) {
        // 使用正則單詞邊界匹配
        const regex = new RegExp(`\\b${typo}\\b`, "gi");
        cleaned = cleaned.replace(regex, correct);
    }

    return cleaned;
}

module.exports = { cleanTitle };
