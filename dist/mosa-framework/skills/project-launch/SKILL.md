---
name: project-launch
description: 項目啟動工作流 (Project Launch Workflow)
skill_id: WF_PROJECT_LAUNCH
category: Workflow
---
每當開始新項目或需要創建新內容時，請執行以下步驟：

1. **在所屬 Workspace 創建新文件夾**
   - 命名格式：`[Project_Name_YYYY-MM]`
   
2. **建立標準樹狀結構**
   ```plaintext
   [Project_Name_YYYY-MM]/
   ├── docs/          # 所有的 Word, PDF, 報表, 企劃書
   ├── assets/        # 照片 (Renovation photos), 影片, 原始素材
   ├── logs/          # 溝通記錄, 腳本執行日誌 (Apps Script logs)
   ├── task.md        # 核心執行進度與逆向工程變量
   └── implementation_plan.md  # 詳細的原子步驟分解
   ```

3. **初始化核心文件**
   - 依照 `user_global` 規則，讀取 `auto-skill/SKILL.md`。
   - 調用 `/orchestrator_agent` 進行 Inversion (逆向需求工程) 與 Decomposition (原子級解構)。
   - 在新項目目錄下建立 `task.md` 與 `implementation_plan.md`。
