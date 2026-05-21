---
name: pdf-to-excel-export
description: How to export company names from Bursa Malaysia list (PDF) and insert into registry (Excel)
skill_id: WF_PDF_TO_EXCEL
category: Workflow
---

# Workflow: Bursa PDF to Excel Registry Export

This workflow describes the process of extracting the public listed company (PLC) name from a Bursa Malaysia PDF and updating the local Python-based registry.

## Prerequisites
- Python environment with `pandas`, `openpyxl`, and `pdfplumber`.
- `pdfplumber` can be installed via: `pip install pdfplumber`.

## Steps

### 1. File Preparation
- Ensure the source PDF (e.g., `List_of_Companies.pdf`) is in the project root.
- Ensure the destination Excel (e.g., `knowledge-base/bursa_plcs_registry.xlsx`) exists or is ready to be created.

### 2. Run the Extraction Script
Execute the following command to run the automation:
```powershell
py extract_and_registry.py
```

### 3. Script Logic Overview
- **Extraction**: Opens the PDF and iterates from Page 2 onwards to find the company list table.
- **Cleaning**: 
    - Removes suffixes like `BERHAD`, `BHD`, `SDN BHD`, `HOLDINGS`, etc.
    - Sanitizes extra spaces and special characters.
    - Converts names to `Title Case` for consistency.
- **Integration**:
    - Loads the existing Excel registry.
    - Checks for duplicates by matching normalized names.
    - Appends only new unique companies with the source tag `Bursa Malaysia PDF`.

### 4. Verification
- Check the console output for the number of "Extracted" vs "New unique" companies.
- Open `knowledge-base/bursa_plcs_registry.xlsx` and verify the new entries in the `Company_Root_Name` column.

## Troubleshooting
- **No text extracted**: Ensure the PDF is not a scanned image (requires OCR).
- **Table Detection Failure**: If Bursa changes the PDF layout, the `extract_tables()` logic or the column index `row[1]` might need adjustment.
