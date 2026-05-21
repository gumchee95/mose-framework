# KYC 搜索模式與篩選標準 (Screening Patterns)

## 1. 核心搜索模式 (Search Queries)

### A. 法律合規性 (Legal)
- `"[Company Name]" site:ssm-einfo.my` (馬來西亞企業註冊)
- `"[Company Name]" site:opencorporates.com` (全球企業庫)
- `"[Company Name]" litigation record` (法律訴訟記錄)

### B. 創始人背景 (Founder)
- `"[Founder Name]" + "[Company Name]" background check`
- `"[Founder Name]" + "directorship" Malaysia`
- `"[Founder Name]" + "bankruptcy" record`

### C. 僱主聲譽 (Reputation)
- `"[Company Name]" work culture Glassdoor`
- `"[Company Name]" Reddit intern experience`
- `"[Company Name]" LinkedIn employee count trend`

## 2. 篩選評分標準 (Scoring Rubric)

| 風險級別 | 判斷指標 | 處理動作 |
| :--- | :--- | :--- |
| **🟢 Green** | 註冊滿 5 年，無負面新聞，Glassdoor 評分 > 3.5 | 直接批准 |
| **🟡 Yellow** | 註冊不足 2 年，或屬於加密貨幣、傳銷邊緣行業 | 要求提供 6 個月銀行流水 |
| **🔴 Red** | 創始人有欺詐前科，或經營狀態為 "Inactive" | **立即拒絕** |

## 3. 虛擬辦公室辨別 (Virtual Office Detection)
- 檢查地址是否包含 "Virtual Office", "Shared Space", "Level 1-23" 且無具體門牌。
- 使用 Google Maps 街景檢查是否為居民住宅或無標識的店鋪。
