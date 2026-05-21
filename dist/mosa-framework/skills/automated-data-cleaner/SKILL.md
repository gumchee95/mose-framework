---
name: automated-data-cleaner
description: "自動化數據清理器：專門處理職位名稱中的常見拼寫錯誤 (Typos) 與格式標準化。在進入行業判定邏輯前執行預處理。"
skill_id: AUTOMATED_DATA_CLEANER
category: Data_Engineering
---

# Automated Data Cleaner (自動化數據清理器)

## 0. 元邏輯 (Meta-Logic)

本技能的目標是將「髒數據」(Dirty Data) 轉換為「乾淨數據」(Clean Data)。特別針對 SKPG 大學生就業追蹤數據中常見的人工輸入錯誤（如拼錯、縮寫、多餘標點）進行修復。

它應作為 `industry_map.js` 的前導組件運行。

## 執行動作 (Execution Actions)

### 1. 字符串標準化 (Normalization)
- 移除首尾空格。
- 統一轉為小寫。
- 移除多餘的比標點符號 (如 `#`, `*`, `!`)，但保留必要的分隔符。

### 2. 拼寫糾錯 (Typo Correction)
根據以下字典進行替換：

| 原始字詞 (Mistake) | 目標字詞 (Correct) |
| :--- | :--- |
| `asistant`, `asistance`, `asist` | `assistant` |
| `enginee`, `enginner`, `enginer` | `engineer` |
| `acc`, `acct` | `account` |
| `acturial`, `acturail` | `actuarial` |
| `assiociate`, `assocaite` | `associate` |
| `beutician` | `beautician` |
| `dietetion`, `dietetic` | `dietitian` |
| `outsoursing` | `outsourcing` |
| `annonator` | `annotator` |
| `project manager assistant` | `Assistant Project Manager` |

### 3. 工具鏈集成 (Integration)
- 下載或調用 `./scripts/clean_titles.js` 模組。
- 在 `standardize()` 函數入口點插入清理邏輯。
