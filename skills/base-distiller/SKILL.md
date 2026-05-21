---
name: Registry Distiller
description: A standalone utility for redefining and distilling the core Antigravity registries (Skills, Knowledge, and Experience). Independent of the MOSA framework.
skill_id: BASE_DISTILLER
category: Core
---

# Registry Distiller (註冊表精煉器)

This skill is designed as a standalone "Registry Hardening" utility. It analyzes the three core indices of the Antigravity system to ensure data integrity, semantic consistency, and structural cleanliness.

## 核心功能 (Core Functions)

### 1. 職能註冊表校準 (Skills Registry Distillation)

- **路徑驗證**: 檢查 `skills_registry.json` 中定義的所有 `filepath` 是否確實存在於磁碟。
- **標籤標準化 (Tag Normalization)**: 識別拼寫相近、大小寫不一或語義重疊的標籤。
- **重複技能整合 (Suite Consolidation)**: 識別相似或關聯的技能群組，將其重構整合為「主套件 (Master Suite)」並將子技能轉移至 `references/` 資料夾，以減少全域註冊表體積。
- **標籤衝突修剪 (Tag Collision Pruning)**: 自動辨識並修剪過度重疊的標籤，確保全域註冊表之標籤重疊率低於 50%（或零衝突）。
- **孤件清理 (Orphan Cleanup)**: 識別磁碟中有但 registry 沒登記的技能，或 registry 登記但磁碟消失的技能。

### 2. 知識庫索引精煉 (Knowledge-Base Refinement)

- **分類重疊分析**: 比對不同 Category 之間的 `keywords`，識別高重疊度（>60%）的分類，建議進行合併（Combination）。
- **元數據補完**: 確保每個分類都有對應的 `.md` 檔案，且標籤具有高檢索價值。

### 3. 經驗索引摘要 (Experience Distillation)

- **狀態摘要**: 匯總各技能的經驗累積量，識別過於冗長的經驗記錄，建議進行更高維度的 Logic Extraction。

---

## 執行工作流 (Execution Workflow)

1. **掃描 (Scan)**: 讀取 `skills_registry.json`, `knowledge-base/_index.json`, `experience/_index.json`。
2. **提議 (Propose)**: 生成一份詳細的《精煉提議報告 (Propose Changes Report)》，列出所有建議的變更、合併項與標籤對齊。
3. **確認 (Confirm)**: 等待用戶確認提議。
4. **執行 (Execute)**: 在用戶核准後，更新對應的 JSON 檔案並建立備份。

## 獨立性宣告 (Independent Policy)

- 本技能**不依賴** MOSA Framework 的 Orchestrator 或 Router。
- 嚴禁在未獲得用戶明確核准的情況下修改核心索引檔案。
