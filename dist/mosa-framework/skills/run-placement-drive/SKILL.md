---
name: run-placement-drive
description: 企業招聘會活動統籌全流程 (Corporate Placement Drive Orchestrator)
skill_id: WF_PLACEMENT_DRIVE
category: Workflow
---

# 企業招聘會統籌 (Corporate Placement Drive)

本工作流由 `orchestrator_agent` 驅動，遵循 Inversion 與 Decomposition 模式統籌人才招聘盛會。
所有 Sub-Agent 均遵循 MOSA Layer C 解耦原則 — 僅加載所需 Skill SOP 執行。

## 執行管線 (Pipeline)

### Phase 1: 逆向需求偵測 (Inversion)
1. **`@admin_agent`** [Load Skill: `strategic-finance`]
   - 產出市場招聘趨勢、預算框架與 ROI 損益平衡分析。
2. **`@orchestrator_agent`**
   - 偵測 JD、場地規格、核心變量的缺失（$\Delta V$ 檢查）。
   - 若有缺失，暫停管線並向用戶提問補全。

### Phase 2: 原子執行 (Decomposition)
3. **`@admin_agent`** [Load Skill: `hr-strategy`]
   - 執行全生命週期招聘邏輯（篩選、Top 5 短名單、面試排程建議）。
   - 使用 `pdf` / `docx` 技能解析履歷數據。
4. **`@admin_agent`** [Load Skill: `compliance-framework` / `project-management-core`]
   - 產出全週期項目里程碑 (Gantt) 與現場執行 SOP。
   - 草擬統籌計劃、風險預案 (Risk Management Plan)。
5. **`@admin_agent`** [Load Skill: `internal-comms` / `brand-guidelines`]
   - 產出增長行銷方案（雙語社群文案、新聞稿、品牌視覺指導）。

### Phase 3: 彙總核准與交付 (Integration)
6. **`@audit_agent`**
   - 對招聘合規性、預算偏差與執行風險進行終審。
7. **`@design_agent`** [Load Skill: `frontend-design`]
   - 整合為排版精美的《Corporate Placement Execution Report》。
   - 最終報告存入 `02_Output/Final/`。

## 狀態持久化
- 每個 Phase 完成後，產出指針必須寫入 `01_Work/session_state.json`。
- 最終報告存入 `02_Output/Final/`。
