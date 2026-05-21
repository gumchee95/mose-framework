---
name: simple-workflow
description: 簡單任務執行工作流 (Simple Task Workflow)
skill_id: WF_SIMPLE_TASK
category: Workflow
---
執行基礎任務時，請遵循以下原子化步驟：

1. **需求確認**
   - 快速拆解用戶核心目標。
   - 確認是否有現有 Skill 可用。

2. **環境整備**
   - 檢查 `01_Work/session_state.json` 狀態。
   - 確保工作目錄符合 Workspace 隔離原則。

3. **執行與紀錄**
   - 執行原子化指令或調用 Sub-Agent。
   - 將中間產物路徑存入 `task_results.md`（Sub-Agent 執行結果指針，區別於 orchestrator 的 `task.md` 任務規劃）。

4. **輸出歸檔**
   - 將最終結果移動至 `02_Output/`。
   - 清理 `session_state.json` 觸發系統 GC。
