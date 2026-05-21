---
name: run-investment-committee
description: 聯合投資委員會運作全流程 (Joint Investment Committee Orchestrator)
skill_id: WF_INVESTMENT_COMMITTEE
category: Workflow
---

# 聯合投資委員會 (Joint Investment Committee)

本工作流由 `orchestrator_agent` 驅動，結合多維度專業單元進行高層級投研決策。
所有 Sub-Agent 均遵循 MOSA Layer C 解耦原則 — 僅加載所需 Skill SOP 執行。

## 執行管線 (Pipeline)

### Phase 1: 宏觀環境掃描
1. **`@market_agent`** [Load Skill: `strategic-finance`]
   - 產出附帶精準時間截斷的宏觀經濟大勢與地緣風險評估。
   - 查核收益率曲線，確立底層流動性與股權折現因子 (WACC/DCF Base)。
   - 防御幻覺原則：明確區分各基準利率（OIS、Fed Funds、10Y UST），嚴禁短端邏輯套用於長端。

### Phase 2: 數據清洗
2. **`@coder_agent`** [Load Skill: `data-analytics-core`]
   - 彙整異質數據源（Yahoo Finance、Bloomberg Terminal CSV），排除幻覺數值。
   - 建立標準化量化面板，輸出為 `01_Work/cleaned_data.csv`。
   - 回傳指針至 `session_state.json`。

### Phase 3: 資產定價與信號
3. **`@market_agent`** [Load Skill: `trading-expert` / `trading-expert-hs`]
   - 執行多維度估值 (DCF/PE Band/Z-Score)。
   - 運用 Pine Script 驗證 MTF 技術信號。
   - 防御幻覺原則：必須顯式標明 Daily/Weekly 時間顆粒度，嚴禁混淆 `Daily SMA200` 與 `Weekly SMA200`。

### Phase 4: 終極審計
4. **`@audit_agent`**
   - 最高風控門檻。對上述所有邏輯與數學模型進行暴力交叉比對復核。
   - 時間級別審查：攔截所有技術面時間維度的矛盾。
   - 估值倒推審查：若處於緊縮周期卻給出高溢價 DCF 倍數，必須駁回。
   - 產出訂正後的『最終官方核准報告書』。

### Phase 5: 視覺交付
5. **`@design_agent`** [Load Skill: `frontend-design` / `canvas-design`]
   - 提取 Audit Agent 拍板定案的數據。
   - 構建華爾街風格的高級互動網頁或簡報。

## 狀態持久化
- 每個 Phase 完成後，產出指針必須寫入 `01_Work/session_state.json`。
- 最終報告存入 `02_Output/Final/`。
