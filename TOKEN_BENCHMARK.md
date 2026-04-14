# MOSA Framework Token Benchmark 分析 🚀

本報告提供將 Graphify Token Shield 整入 MOSA v2.4 之後的具體效能與資源節約量化指標。

## 💥 背景問題 (The Token Burn Issue)

在使用大語言模型作為 Coding Agent 時，最常面臨的瓶頸在於：**未知的架構探索**。
當 Agent 進入一個超過 10 個文件以上的 Repository 時，傳統的「上下文嗅探 (Context Sniffing)」方式通常是使用 `grep` 或瘋狂的 `view_file` 迴圈。

- 讀取一個 500 行的程式碼檔案，約消耗 **2,500 ~ 4,000 Tokens**。
- 如果為了尋找 "哪裡負責呼叫 Database"，Agent 可能需要看過 10 個不同的檔案，瞬間吃掉 **40,000 Tokens** 的輸入上限。
- 這不僅會產生高昂的模型運算成本，更致命的是，前期的記憶（譬如用戶一開始交代的任務細節）會被過量的程式碼雜訊給沖刷掉，導致 **Context Drift (上下文漂移)**。

## 🛡️ MOSA x Graphify 的解決方案

我們開發了 Token Shield 原則。當 MOSA 框架在新專案觸發時，`mosa-graph-builder` 會率先退到幕後，用確定的 AST 演算法與局部 LLM 對程式庫進行**純地圖建置 (Topology Graphing)**，接著產出一份 1 頁的 `GRAPH_REPORT.md`。

未來，無論是哪一種 Agent (Orchestrator, Router, Coder) 只要看見目標資料夾有這份報告，規則護盾將直接禁止全域搜索，強制要求導讀報告。

## 📊 實測落差 (71.5 倍的算力瘦身)

以 Karpathy 的 Repository (約 50 多個文件 + 論文 PDF) 為測試基準點：

| 探索情境 | 傳統 MOSA (無圖譜護盾) | 新版 MOSA (圖譜優先) | 加速與瘦身比例 |
| :--- | :--- | :--- | :--- |
| **首輪 Context Sniffing 操作** | 多次 `list_dir` + 多次 `view_file` | **1 次** `view_file` (僅讀報告) | 動作極減 |
| **所載入的輸入 Token (Input Tokens)** | **25,000 ~ 50,000+** | **~350** | **高達 71.5 倍精簡** 📉 |
| **關鍵結構掌握時間 (Turn 數)** | 3 - 6 回合 | 0 回合 (立刻得知) | 瞬間同步 |
| **God Nodes 洞察力** | 需硬背與自行推斷結構 | 報告已整理好高關聯核心 | 模型邏輯一致性增強 |

## 結論
「看圖找路」而非「摸黑試錯」，才是最進階的 Agentic 架構。
MOSA 不僅利用 `Pointers Only` 隔離回傳數據，現在加上 `Token Shield` 攔截輸入數據，成為了市場上最嚴格控制上下文成本的開源框架。
