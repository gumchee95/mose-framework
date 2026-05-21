---
name: scraping-failure-handler
description: "爬蟲韌性與熔斷處理：自動檢測數據抓取故障（403/404/Timeout），執行持久化日誌記錄，並通過多模態通知觸發 Agent 或人工手動介入。"
skill_id: SCRAPING_FAILURE_HANDLER
category: Tech
---

# Scraping Failure Handler (爬蟲故障熔斷器)

## 0. 元邏輯：失敗隔離與手動轉接 (Failure Isolation)

當自動化抓取腳本遭遇不可抗力（如 WAF 攔截、反爬升級）時，本技能負責將「自動化瓶頸」轉化為「可被感知的任務」，防止系統陷入無效重試。

## 1. 執行流程 (Workflow)

### A. 故障檢測 (Detection)
- 監控 HTTP 響應碼。特點：
  - `403 Forbidden`: 觸發熔斷，標記為「被攔截」。
  - `404 Not Found`: 觸發熔斷，標記為「鏈接失效」。
  - `Timeout`: 三次重試後觸發熔斷。

### B. 持久化記錄 (Persistent Logging)
- 寫入 `scraping_failures.json`。
- **格式規範**：
  ```json
  {
    "timestamp": "ISO8601",
    "asset": "Name",
    "reason": "Explicit Error Message",
    "intervention_required": true
  }
  ```

### C. 多模態通知 (Dual-Mode Notification)

#### 模式 1：Windows Toast (平台限定)
- 使用 `winotify`。
- **配置**：
  - `title`: "⚠️ Scraping Failure"
  - `msg`: "Intervention needed for [Asset]"
  - `audio`: `Reminder`

#### 模式 2：Agnostic Log (平台無關)
- 在終端標準輸出及 `Agent_Activation_Log.md` 中寫入 `[SIGNAL: INTERVENTION_NEEDED]`。
- 供後續 Agent Turn 自動解析並切換至 `browser_subagent`。

## 2. 應用場景

- **金融數據監控**：Investing.com, Yahoo Finance 等敏感站點。
- **政府數據抓取**：對延遲與 IP 敏感的門戶。

## 3. 代碼模板 (Python)

```python
def handle_failure(asset_name, reason):
    # 1. Agnostic Log
    print(f"[SIGNAL: INTERVENTION_NEEDED] {asset_name} failed: {reason}")
    
    # 2. Windows Toast (Optional)
    try:
        from winotify import Notification
        toast = Notification(app_id="MOSA", title="Scraping Blocked", msg=asset_name)
        toast.show()
    except: pass
```
