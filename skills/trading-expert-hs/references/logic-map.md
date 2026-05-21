---
skill_id: "REFERENCES"
category: "Core"
tags: []
complexity: "Medium"
---
# HS_Swing_Signal Integrated Logic Map

This document maps the distilled logic from `HS_Swing_Signal_Integrated.txt` into a hierarchical flow for future Agent reference.

## 1. Hierarchy of Permission (The "Gatekeeper")

| Level | Component | Criteria | Action if Failed |
| :--- | :--- | :--- | :--- |
| **L1: Macro** | Weekly RSI | `w_rsi < 80` | **FORCE WAIT** |
| **L1: Macro** | Weekly SMA 200 | Slope `ROC(5) >= -0.5` | **FORCE WAIT** |
| **L2: Buffer** | SMA 200 Zone | `abs(close - w_sma) <= w_atr * 2.5` | **UNREADY** |
| **L3: Regime** | Accumulation | `w_rsi [30-55]` + `w_mom_up` | **GREEN ZONE** |
| **L3: Regime** | Momentum | `mad_z [-1, 1]` + `rs_bull` | **SKYBLUE ZONE** |
| **L4: Confirm** | Volume | `vol_z > 1.2` | **FILTERED** |

## 2. Signal Units (Execution Units)

| Priority | Unit Name | Logic Source | Target Environment |
| :--- | :--- | :--- | :--- |
| **Elite** | `VCP_Signal` | BB Width + Dynamic Vol | SkyBlue (Breakout) |
| **Elite** | `Smart_HTF` | High Tight Flag | SkyBlue (Momentum) |
| **Tactical** | `PRCS/Cheat` | Z-Score Consolidation | Green (Accumulation) |
| **Recovery** | `Wyckoff Spring` | `mad_z > -1.5` + Rejection | Green (Support) |

## 3. Dynamic Scaling (The "Engine")

- **`v_factor` (Relative Volatility Index)**:
    - Scales `vcp_squeeze` and `atr_trailing_stop`.
    - High Vol -> Looser Stops / Tighter Squeeze threshold.
    - Low Vol -> Tighter Stops / Looser Squeeze threshold.
