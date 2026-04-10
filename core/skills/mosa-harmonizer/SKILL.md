---
name: mosa-harmonizer
description: "MOSA 框架大一統協調員：負責全量審計架構完整性、對齊索引標籤與路徑、並提供系統整合方向。當框架出現邏輯衝突、路徑失效或索引不對稱時啟動。"
skill_id: MOSA_HARMONIZER
category: Core
---

# MOSA Harmonizer (框架大一統協調員)

## 0. 元邏輯：全量對齊 (Framework Alignment)

本技能不處理具體業務，僅負責維護 MOSA 框架的「架構純度」與「整合深度」。每次調用時，必須執行以下四層掃描：

### A. 系統協議掃描 (Layer A Protocols)
*   檢查 `~/.gemini/GEMINI.md` 是否符合「觸發協議」。
*   確保無路徑硬編碼（嚴禁出現 `C:\Users\...`）。

### B. 認知索引掃描 (Layer B Memory)
*   比對 `knowledge-base/_index.json` 與 `experience/_index.json`。
*   檢查關鍵詞與 `skills_registry.json` 的對稱性。
*   **目標**：確保「想到什麼」就能「載入什麼」。

### C. 執行路徑掃描 (Layer C Agents)
*   檢查 `orchestrator_agent` 是否正確執行「寫放分離」。
*   檢查 `router_agent` 是否具備路徑彈性。

### D. 工作空間掃描 (Layer D Workspace)
*   檢查 `00_System`, `01_Work`, `02_Output` 是否初始化。
*   檢查 `session_state.json` 是否包含非法全文數據（指針檢查）。

### E. 負載與歸檔掃描 (Layer E Maintenance) -- 僅在 --maintenance 模式啟動
*   **日誌壓縮**：將 `01_Work/Agent_Activation_Log.md` 轉存至 `02_Output/Archive/Log_[Timestamp].md`。
*   **狀態重置**：清空 `session_state.json` 並重置 `state.json` 中的 `turn_count` 為 0。
*   **指針固化**：將當前 `implementation_plan.md` 的關鍵成就寫入 `00_System/prompt_stack.md` 作為長期記憶。

---

## 整合方向報告規範 (Standard Output)

每次執行後，必須輸出以下結構的報告：

### 1. 結構完整性 (Architecture Integrity)
- [ ] Layer A: [Status]
- [ ] Layer B: [Status]
- [ ] Layer C: [Status]
- [ ] Layer D: [Status]

### 2. 發現的衝突/Bug (Discovered Misalignments)
- 列表展示所有硬編碼路徑、冗餘指令或斷裂的索引。

### 3. 未來整合方向 (Future Direction)
- 根據當前專案，建議下一個需要建立的 Skill 或 Agent 角色。
- 建議知識庫的歸檔路徑。

---

## 執行動作 (Execution Actions)

1. **[Tool: list_dir]** - 掃描技能庫與工作流程目錄。
2. **[Tool: view_file]** - 讀取三份索引文件 (`knowledge`, `experience`, `registry`)。
3. **[Tool: grep_search]** - 檢索全庫中的 `Hardcoded Paths`。
4. **[Tool: replace_file_content]** - 自動修復路徑並同步索引。
