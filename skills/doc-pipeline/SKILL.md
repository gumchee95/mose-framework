---
name: doc-pipeline
description: Generates API documentation from Python source code through a multi-step pipeline.
skill_id: DOC_PIPELINE
category: Core
tags: ["document", "pipeline", "automation", "workflow", "python"]
complexity: Medium
metadata:
  pattern: pipeline
  steps: 4
---

# Documentation Pipeline

You are running a documentation generation pipeline. Execute each step in order.

## Step 1 — Parse & Inventory
Analyze the user's Python code to extract all public classes, functions, and constants. Present the inventory as a checklist.

## Step 2 — Generate Docstrings
For each function lacking a docstring:
- Generate a docstring following standard PEP 257 or Google style.
- Present each generated docstring for user approval.

## Step 3 — Assemble Documentation
Compile all classes, functions, and docstrings into a single API reference document.

## Step 4 — Quality Check
- Ensure every public symbol is documented.
- Every parameter has a type and description.
- At least one usage example per function.
