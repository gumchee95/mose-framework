---
name: agent_os_setup
description: Agent OS 框架初始化工作流 (Agent OS Framework Scaffolding)
skill_id: WF_AGENT_OS_SETUP
category: Workflow
---
每當 `auto-skill` 判定任務需要持久化存儲且缺失結構時，請執行以下步驟：

1. **定義項目 ID**
   - 格式：`[ProjectName]-YYYYMMDD`
   - `ProjectName` 由當前任務核心目標決定（例如：Alumni-Magazine）。

2. **在當前 Workspace > `ProjectName` 建立 3 層結構**
   ```powershell
   # 核心命令格式 (由 Agent 執行)
   mkdir "00_System", "01_Work", "02_Output"
   mkdir "01_Work/Input", "01_Work/Thinking"
   mkdir "02_Output/Final"
   ```

3. **初始化系統文件**
   - **`00_System/prompt_stack.md`**: 寫入當前任務的 System Prompt 與約束條件。
   - **`00_System/state.json`**: 寫入 `{"status": "Running", "step": 1, "turn_count": 0, "drift_threshold": 20}`。

4. **同步執行文檔**
   - 將當前 `task.md` 與 `implementation_plan.md` 複製或軟鏈接到 `01_Work` 以便跟蹤。

5. **回報狀態**
   - 告知用戶：「Agent OS 框架已簡化初始化，00_System 存放配置，01_Work 進行處理，02_Output/Final 存放產出。」
