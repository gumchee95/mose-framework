---
name: gas-webapp-architect
description: Comprehensive framework for generating robust Google Apps Script (GAS) Web Apps backed by Google Sheets. Use this when the user needs a high-performance web app for data entry, scanning, or querying with features like client-side caching, instant search, hardware scanner compatibility, auto-tracking logs, and batch email processing with quota protection.
skill_id: GAS_WEBAPP_ARCHITECT
category: Framework
---

# GAS Web App Architect (v2.0)

This skill provides a battle-tested architecture for building Google Apps Script (GAS) Web Apps that interact with Google Sheets. It is specifically designed to overcome the typical 2-3 second execution latency of Google Apps Script by using Client-Side Caching, and provides robust patterns for data synchronization and hardware scanner integration.

## Core Architectural Patterns

When designing a GAS Web App using this skill, implement these core patterns:

### 1. Client-Side Caching (The "Instant" Feel)
GAS calls (`google.script.run`) are slow. Do not query the server on every user action.
- **On Load**: Use `window.onload` to fetch the entire active dataset via `getAllStudents()` (or equivalent). Show a "Syncing Database" overlay.
- **In-Memory Search**: Store the returned array in `window.dataCache = []`. Use `Array.prototype.find()` or `.filter()` to query data instantly (<1ms).

### 2. Async Write-Back & Double-Claim Prevention
- When a user takes an action (e.g., scanning a barcode to collect an item), update the local cache immediately to prevent rapid double-scanning.
- Display the success UI to the user instantly based on the cache.
- Fire an asynchronous call (e.g., `google.script.run.markAsCollected()`) to write the timestamp to the Google Sheet in the background.
- **Validation**: If the local cache shows the item is already collected, immediately throw a bold UI warning (e.g., red flash, "ALREADY COLLECTED") without contacting the server.

### 3. Hardware Scanner Compatibility & Auto-Detection
Hardware barcode/QR scanners act as keyboards that rapidly type characters.
- **Enter Key Trigger (Standard)**: Most scanners append an `Enter` keypress. Bind an event listener to the input field for `event.key === "Enter"` and call `event.preventDefault()` to stop form submission.
- **Fixed-Length Auto-Detect (Fallback)**: If the scanner does *not* send an `Enter` key, or to support extremely fast operations, bind an `input` event listener that checks the `value.length`. `if (this.value.trim().length === 7) { submit(); }`. This balances auto-detect for machines while leaving manual typing buffer time for humans.
- **Disable Input**: Immediately set `inputField.disabled = true` while processing to prevent scanner double-fire.
- **Re-focus**: After processing, set `inputField.value = ""` and `inputField.focus()` to prepare for the next scan.

### 4. Two-Step Verification Flow (Optional)
When you need to bind two unique identifiers together (e.g., a Student ID and a Serial Number), use a sequential flow:
- **Step 1 (Scan ID)**: Validate existence. If invalid or already claimed, throw an error instantly.
- **Step 2 (Input Serial)**: If Step 1 passes, dynamically display the second input field and `focus()` it automatically.
- **Zero-Latency Duplicate Check**: On submit, run `window.dataCache.find(s => s.serialNumber === newSerial)` to prevent duplicate entries instantly before hitting the backend.

### 5. Clean Date Formatting
Avoid using default `new Date().toLocaleString()` or `toString()` if it outputs complex timezone data like `GMT+0800 (Singapore Standard Time)`. Instead, manually assemble a clean string: `YYYY-MM-DD HH:MM:SS` for professional front-end logs.

### 4. Dynamic Column Mapping
Never hardcode array indices (`row[1]`) when reading Sheets data. Users frequently add or move columns in Google Sheets.
- **Read Headers**: `const headers = sheet.getDataRange().getValues()[0];`
- **Map Indices**: `const colIdx = { id: headers.indexOf("Student ID"), name: headers.indexOf("Name") };`
- Ensure you check if required columns exist (`if (colIdx.id === -1) throw Error;`).

### 6. API Quota Protection (Batch Emails)
When looping through hundreds of rows to send emails, `MailApp.getRemainingDailyQuota()` must NOT be called inside the loop, as repeated API calls will cause timeouts.
- Call `let quota = MailApp.getRemainingDailyQuota();` ONCE before the loop.
- Manually decrement `quota--` inside the loop.
- Break the loop and alert the user if `quota <= 0`.
- Use a `Send Email Trigger` column (e.g., "Send" / "Sent") to manually trigger batch emails and ensure idempotency.

## Bundled Assets

This skill includes a complete boilerplate implementation located in the `assets/` directory:

- **`assets/Code.gs`**: Contains the robust backend logic including `getAllStudents`, `markAsCollected`, `processBatchEmails` (with quota protection), and `setupSheet`.
- **`assets/Index.html`**: Contains the frontend UI with the "Syncing" overlay, local cache search logic, scanner compatibility, and a premium minimalist design.

**Usage:** When a user requests a new GAS Web App, you can read the assets to understand the exact implementation, or directly copy the asset code as a starting point and modify it to fit their specific columns and business logic.
