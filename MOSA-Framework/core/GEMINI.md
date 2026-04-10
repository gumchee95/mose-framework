# MOSA Framework Core Rules (GEMINI.md) — v2.1
> **Last Updated**: 2026-04-10 | **Architecture**: MOSA (Markdown-Oriented Skill Architecture)

This file defines the global instruction set for any AI assistant running within the MOSA environment.

## 任務啟動協議 (強制)
* 當開啟新任務或觸發任何技能時，必須同時啟動以下程序：
  1. 讀取並執行 `auto-skill` 技能的 `SKILL.md`（底層知識與經驗循環）。
  2. 調用 `/orchestrator_agent` 進行「逆向需求工程 (Inversion)」與「原子級解構 (Decomposition)」。
  3. 基於編排好的 [原子動作] 建立 `task.md` 與 `implementation_plan.md`。

## Agent 工作流管理規範 (強制)
* 所有的 Agent 調用、修改或新增，**必須優先執行於以下唯一全域路徑**：
  `~/.gemini/antigravity/workflows`
* **嚴禁**在 `skills/workflows/`、項目本地 `.agents/workflows` 或任何其他路徑中存放 Agent 定義，確保跨專案的一致性與單一正典 (Single Source of Truth)。

## 工作空間隔離與語言偏好 (Workspace Isolation & Language Bias Fix) (強制)
1. **隔離優先與深度偵測 (Isolation & Deep Discovery)**: 
   - 當偵測到多個含有 `00_System` 的項目目錄時，模型必須從**當前 Active Document 所在目錄**向上遞迴搜尋父目錄，鎖定最近親的 `00_System` 作為 Workspace Root。
   - 嚴禁跨越 Sibling 資料夾載入配置（例如：在 `operation/` 工作時禁止觸碰 `Bond/` 的檔案）。
2. **語言對齊策略**: 若指令集中存在多語言（中英文混雜），模型應優先**依據用戶最近一次回覆的語言**或項目的 `prompt_stack.md` 中的 `Language Preference` 標籤進行回覆。
3. **路徑鎖定與自動初始化**: 所有自動化腳本或 Agent 必須以 Workspace Root 為基準。若偵測到缺失 `00_System`，應主動引導用戶執行初始化或調用 `@agent_os_setup`。

## MOSA 架構管理規範 (強制)
* **技能定義 (Layer A/B)**: 所有新技能必須轉換為帶有 YAML Frontmatter (包含 `skill_id`, `category` 等) 的 Markdown 存入 `~/.gemini/antigravity/skills`，由 `router_agent` 按需加載。
* **解耦執行 (Layer C)**: 嚴禁直接在 Sub-Agent 端塞入過量領域知識。所有 Sub-Agent (如 `admin_agent`, `market_agent`, `coder_agent`) 必須純粹依賴讀取到的 Skill SOP 運行。Agent 為「SOP 執行機」，不內建業務邏輯。
* **狀態持久化 (Layer D)**: Agent 之間嚴禁超長上下文傳話，全部依賴讀寫 `01_Work/session_state.json` 或 `task_results.md` (Shared Session)。
* **路徑可攜性**: 所有配置和引用一律使用 `~/` 相對路徑，嚴禁硬編碼絕對路徑如 `C:\Users\...`。

## 跨 Agent 共享狀態與持久化邊界 (MOSA Persistence & GC)
1. **建立共享記憶**：在每次多步驟任務執行時，主控者必須在 `01_Work/` 或項目根目錄下建立一個 `session_state.json` 或 `task_results.md`。
2. **強制指針引用法則 (Pointers Only)**：所有 Sub-Agent 在產出中間超大結果時，絕對**嚴禁**將全量數據寫入 `session_state.json`。只允許存儲文件的相對/絕對路徑指針。
3. **系統自動垃圾回收 (GC)**：當任務成功並轉移至 `02_Output` 後，**必須清空/重置該任務的 session_state.json**，確保下一輪任務以乾淨的狀態啟動。

