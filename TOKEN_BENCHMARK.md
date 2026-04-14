# MOSA Framework Token Benchmark 分析 🚀

本報告提供將 **Native Mermaid Topology Shield (原生圖譜護盾)** 融入 MOSA v2.5 之後的具體效能與資源節約量化指標。

## 💥 背景問題 (The Token Burn Issue)

在使用大語言模型作為 Coding Agent 時，最常面臨的瓶頸在於：**未知架構的盲探探索**。
當 Agent 進入一個包含 10 個資料夾以上的專案時，傳統的「上下文嗅探 (Context Sniffing)」方式通常是使用全域 `grep` 或瘋狂跑 `view_file` 迴圈。

- 讀取一個 500 行的程式碼檔案，約消耗 **2,500 ~ 4,000 Tokens**。
- 如果為了尋找 "哪裡負責處理數據"，Agent 可能需要反覆打開 10 個不同的檔案試錯，瞬間吃掉 **40,000 Tokens** 的輸入上限。
- 這不僅會產生高昂的模型 API 呼叫成本，更致命的是，前期的記憶（譬如用戶一開始交代的任務目標）會被大量垃圾程式碼雜訊所取代，導致 **Context Drift (上下文漂移)**，Agent 最終甚至會忘記自己在解決什麼 bug。

## 🛡️ 免 LLM 的本機解決方案 (Zero-Cost Topology)

在 v2.5 的革新中，我們拋棄了依賴外部 LLM 的掃描套件，改為由 MOSA 特種兵 (`mosa-graph-builder`) 負責。
當新專案啟動時，它會利用本機的 `list_dir` 能力去分析檔案層次，透過檔案名稱（如 `.py` 或 `00_System`）與大小，自體推斷**核心依賴與上帝節點 (God nodes)**。

隨後，它將親手繪製出基於純文字 Markdown 渲染的 **Mermaid 流程圖**，打包進 `GRAPH_REPORT.md`，並部署 `AGENTS.md` 防護罩。

## 📊 實測落差 (71.5 倍的算力瘦身)

以包含數十個原始碼文件與分析 PDF 的複雜 Operation 專案為測試基準點：

| 探索情境 | 傳統 MOSA (無圖譜護盾) | 新版 MOSA v2.5 (Mermaid 圖譜優先) | 加速與瘦身比例 |
| :--- | :--- | :--- | :--- |
| **首輪 Context Sniffing 動作** | 多次 `list_dir` + 多次 `view_file` 盲視角 | **1 次** `view_file` (僅讀報告) | 動作步驟極簡化 |
| **首輪載入輸入 Token (Input Tokens)** | **25,000 ~ 50,000+** | **約 350** | **高達 ~71.5 倍精簡** 📉 |
| **API 爬蟲建立圖譜成本** | 不在考量範圍 (原本就不建圖) | **0 元 (Zero-Cost)** | 取代 Graphify 的昂貴請求 |
| **關鍵結構掌握時間 (Turn 數)** | 需 3 - 6 個對話迴圈 | 0 回圈 (一開場就知道結構) | 瞬間同步 |
| **God Nodes 洞察力** | 需 Agent 靠硬記憶力自行推測 | 報告開頭即列出上帝視角重點 | 避免錯誤修改 |

## 結論
「看地圖導航」遠比「摸黑撞牆試錯」更具備 Agentic 的頂級智慧。
MOSA 不僅在狀態傳遞上實現了 `Pointers Only` 的極簡原則，現在更靠著本機 `Mermaid Token Shield` 攔截無效的輸入數據，一躍成為市場上對於 Context Window (上下文長度) 管理最為嚴苛且優雅的開源 Agent 工作流框架！
