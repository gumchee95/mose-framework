---
name: kyc-data-fetcher
description: 自动化提取企業背景數據，包括註冊詳情、創始人背景、財務指標與輿情評估。用於大學職業日企業的 KYC (Know Your Customer) 審查，支持 SME 與大型企業的差異化檢索。
---

# KYC Data Fetcher

## Overview
本技能旨在通過公開渠道（SSM, LinkedIn, Google News, Glassdoor）快速提取參展企業的關鍵背景信息，幫助審核員判斷其合法性、財務穩定性與學生安全風險。

## Workflow Decision Tree

1.  **企業分類 (Classification)**: 判斷目標是 MNC/正規公司還是 SME/初創。
2.  **路徑分流 (Routing)**:
    -   **MNC**: 優先執行「財務合規與品牌負面」檢查。
    -   **SME**: 優先執行「創始人誠信與實地辦公」檢查。
3.  **數據提取 (Data Fetching)**: 執行多維度搜索（Legal, Founder, Reputation）。
4.  **風險標註 (Risk Tagging)**: 標註 Green/Yellow/Red 燈號。

## 數據提取步驟 (Data Fetching Steps)

### Step 1: 基礎合法性驗證 (Legal Verification)
- **指令**: `google_web_search("[公司名稱] SSM registration status")`
- **目標**: 獲取註冊號、註冊日期與當前經營狀態 (Active/Dissolved)。

### Step 2: 創始人背景深挖 (Founder & Principal Audit) - 僅限 SME
- **指令**: `google_web_search("[創始人/董事姓名] LinkedIn profile lawsuit scandal")`
- **目標**: 檢查是否存在嚴重的個人誠信問題或關聯倒閉企業。

### Step 3: 財務與存續性評估 (Financial & Viability)
- **MNC**: 搜索「[公司名稱] Annual Report 2025 PDF」。
- **SME**: 搜索「[公司名稱] business news funding series」。

### Step 4: 輿情與僱主品牌 (Reputation & Fit)
- **指令**: `google_web_search("[公司名稱] Glassdoor reviews employee turnover")`
- **目標**: 使用 `web_fetch` 抓取評價摘要，分析離職率與管理層口碑。

## 搜索模式清單 (Screening Patterns)
詳細的搜索 Query 與評分標準請參考 [references/screening-patterns.md](references/screening-patterns.md)。
