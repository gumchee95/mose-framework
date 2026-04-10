---
description: Advanced cognitive tool for distilling logic, thinking patterns, and
  procedural knowledge from diverse file formats (PDF, Excel, Word, PPTX, HTML, Source
  Code). Handles multi-file cross-distillation to create integrated Agent Skills.
skill_id: THOUGHT_DISTILLER
category: Core
---

# Thought Distiller (思維蒸餾器)

This skill specializes in extracting "Atomic Logic" and "Implicit Patterns" from multiple or single unstructured/semi-structured documents to generate high-quality, composable Agent Skills.

## 核心工作流 (The Distillation Pipeline)

### Phase 1: 多格式深度解析 (Format-Aware Reading)
根據檔案類型調用對應的讀取單元：
- **Excel/CSV**: 使用 `/xlsx` 讀取表格邏輯、公式與數據結構。
- **Word/PDF**: 使用 `/docx` 或 `/pdf` 提取文本、標題階層與元數據。
- **PPTX**: 使用 `/pptx` 提取幻燈片大綱、關鍵節點與視覺邏輯。
- **HTML**: 使用原生分析提取 DOM 結構與交互邏輯。
- **Code**: 分析代碼流程、API 依賴與設計模式。

### Phase 2: 跨文件關聯分析 (Cross-File Correlation)
當上傳多個文件時，執行以下掃描：
- **數據與邏輯對齊**：比對 Word SOP 中的步驟與 Excel 模板中的欄位關係。
- **缺失檢測 (Delta Scan)**：識別 SOP 提到但 Excel 缺少的邏輯，或 Excel 存在但 SOP 未定義的規則。
- **衝突校準**：若多個文件對同一過程有不同描述，標記為「待核實」並詢問用戶。

### Phase 3: 元邏輯抽取 (Cognitive Extraction)
識別並提取以下核心要素：
- **[A] 原子動作 (Atomic Actions)**: 文件中提到的單一、不可再分的執行步驟。
- **[G] 邏輯門禁 (Logic Gates)**: 判斷條件、限制因素與審計標準。
- **[C] 核心限制 (Constraints)**: 全局變量、安全性要求與偏好設定。
- **[P] 目標路徑 (Pathways)**: 從 Input 到 Output 的最優路徑。

### Phase 4: 技能架構映射 (Architectural Mapping)
將 Phase 3 成果映射至 `skill-architect` 模式（不生成 script 原型）：
- **Pattern Selection**: 決定是否需要 Tool Wrapper, Reviewer 或 Pipeline。
- **Metadata Design**: 生成精確的 YAML 描述以確保正確觸發。

### Phase 5: 技能草案生成 (Skill Drafting)
生成符合標準的 `SKILL.md` 正文，並建議所需的 `references/` 資料。

---

## 執行與約束 (Directives & Constraints)
1. **指令觸發**: `/distill [files...]`
2. **優先讀取**: 
   - 必須讀取 [pattern-library.md](references/pattern-library.md) 獲取思維模版。
   - 必須參考 [format-adapters.md](references/format-adapters.md) 進行結構化轉化。
3. **禁忌**: 
   - **嚴禁**生成任何 `scripts/` 代碼原型，除非用戶明確要求。
   - **嚴禁**在未確認文件關聯的情況下進行單獨蒸餾（若是多文件任務）。
4. **輸出**: 輸出必須包含：
   - 蒸餾出的 `SKILL.md` 代碼塊。
   - 邏輯映射說明 (Pattern Rationale)。
   - 缺失變量提問 ($\Delta V$)。
