---
skill_id: "REFERENCES"
category: "Core"
tags: []
complexity: "Medium"
---
# Thinking Pattern Library

This library contains "fingerprints" of common logical patterns found in professional documents.

## 1. 門禁模式 (The Gatekeeper Pattern)
**關鍵字**: "Only if", "Provided that", "Must check", "Validate", "Verify".
**解法**: 生成一個 `Reviewer` 階段，並在 `Implementation Plan` 中明確標註為 `Critical Gating`.

## 2. 遞歸優化 (Recursive Refinement)
**關鍵字**: "Optimize", "Polish", "Iterate until", "Refine".
**解法**: 生成一個迴路邏輯，建議在 `SKILL.md` 中加入「檢查上一步結果」的自校準步驟。

## 3. 分支決策 (Decision Branching)
**關鍵字**: "Switch", "Depending on", "Case A/B/C", "If...else".
**解法**: 映射為 `Pipeline` 模式中的「條件跳轉」或多個子單元。

## 4. 數據注入 (Data Injection)
**關鍵字**: "Fill from", "Lookup", "Template", "Map to".
**解法**: 識別來源數據檔案（如 Excel/Database），定義 `Data Extraction` 的原子動作。

## 5. 安全與審核 (Compliance & Audit)
**關鍵字**: "Log", "Audit", "Records", "Transparency", "Compliance".
**解法**: 自動在生成的 `SKILL.md` 末尾加入 `Audit Log` 產出要求。
