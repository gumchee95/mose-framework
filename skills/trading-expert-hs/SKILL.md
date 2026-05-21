---
description: Expert Trading Strategy Logic for HS Swing and v26. Handles multi-layer
  macro filters, MAD Z-Score regimes, and institutional signal verification.
skill_id: TRADING_EXPERT_HS
category: Financial
---

# Trading Expert HS (HS_Swing_Signal v26)

This skill encapsulates the high-fidelity institutional swing trading logic from the `HS_Swing_Signal` and `v_26` systems. It is designed to guide the AI in analyzing, auditing, or implementing complex Pine Script trading architectures.

## 1. Environment Analysis (The "Gatekeeper" Mode)
Before proposing or verifying any signal, perform the following "Weekly Env" audit:

### [G] Logic Gates
1.  **Macro RSI Hard Stop**: `Weekly RSI > 80` -> **ABORT** (Market exhausted).
2.  **Macro SMA Slope**: `SMA 200 (Weekly)` Slope < -0.5% -> **ABORT** (Bear market regime).
3.  **SMA 200 Buffer Zone**: Price must be within `ATR(14) * 2.5` of the Weekly SMA 200.
4.  **Accumulation Sweet Spot**: `Weekly RSI` between 30 and 55.

### [P] Decision Pathway
-   If all L1/L2 gates pass and `RSI` or `ATR` is turning up -> **READY (Green Zone)**.
-   If `MAD Z-Score` is between -1 and 1 and `Relative Strength` is strong -> **BREAKOUT (SkyBlue Zone)**.

## 2. Statistical Signal Verification [A]
When reviewing signals (VCP, HTF, PRCS), apply these atomic verification steps:

-   **Volatility Adaptive Scaling**: Use `v_factor` (Relative Volatility Index) to adjust lookbacks and thresholds.
-   **Volume Z-Score Check**: All entries *MUST* have `vol_z > 1.2` unless it's a "Dry Pullback".
-   **Relative Strength Audit**: Ensure the ticker has a positive Alpha Score (63/126/252) against the benchmark index.

## 3. Signal Portfolio Logic
Organize signals into these functional blocks for integration:

| Signal Block | Core Logic Pattern | Target Zone |
| :--- | :--- | :--- |
| **Breakout_buy** | VCP Squeeze + HTF Momentum | SkyBlue (Momentum) |
| **Cheat_buy** | PRCS Consolidation + AVWAP Cheat | Green (Accumulation) |
| **Mean_buy** | Wyckoff Spring + Capitulation | Green (Support) |
| **Follow_thru** | Volatility Ignition + Resonance | All Allowed Zones |

## 4. Execution & Risk [C]
-   **Non-Repainting MTF**: Always use `lookahead=barmerge.lookahead_off` for security calls.
-   **Multi-Layer Exit**: Implement "ATR Trailing Stop" + "Institutional Danger" (RSI/Vol Extreme).
-   **Bias Cap**: `(close - sma20) / atr` must not exceed the defined bias limit to prevent chasing.

---

## 執行與約束 (Directives & Constraints)
1.  **優先分析**: 執行任何交易腳本修改前，必須先輸出「環境審核矩陣」(Environment Audit Matrix)。
2.  **安全性限制**: 嚴禁在未設置 `Weekly RSI Hard Stop` 的情況下生成交易策略。
3.  **模式一致性**: 所有訊號整合必須遵循 `v26` 的波動率自適應參數架構。

## 輸出要求
-   **分析報告**: 必須包含受測腳本與 `HS_Swing_Signal` 標準邏輯的 Delta Scan。
-   **修改建議**: 必須明確標註每個變更點對應的原子動作 [A] 或邏輯門禁 [G]。
