---
skill_id: "REFERENCES"
category: "Core"
tags: []
complexity: "Medium"
---
# Google Agent Design Patterns for Skills

This guide provides a deep dive into applying Google's agentic design patterns to build superior skills.

## 1. Tool Wrapper Pattern (Encapsulation)
*   **Concept**: Instead of teaching the agent the internal logic of a tool, provide a script that takes simple inputs and returns clear outputs.
*   **In Skills**:
    *   **Bad**: "Write a Python script to scrape this URL using BeautifulSoup..."
    *   **Good**: "Use `scripts/scrape.py --url <url>` to get the content."
    *   **Benefit**: Deterministic behavior, lower context usage, and easier versioning.

## 2. Generator Pattern (Construction)
*   **Concept**: A specialized "factory" for building initial outputs.
*   **In Skills**:
    *   Use `references/templates.md` for structured prompting.
    *   Divide generation into *sections*. (e.g., Drafting the executive summary vs. drafting the code).
*   **Benefit**: High-quality, consistent first-pass results.

## 3. Reviewer Pattern (Validation)
*   **Concept**: A critical layer that audits the **Generator's** output.
*   **In Skills**:
    *   **Gating Mechanism**: "You MUST run the validator script after generation."
    *   **Feedback Loop**: If the Reviewer/Validator fails, the agent must refine the output until it passes.
*   **Benefit**: Enterprise-grade reliability.

## 4. Inversion Pattern (Modularity)
*   **Concept**: The main "Instructions" (SKILL.md) should not be coupled with "Implementation" (scripts/references).
*   **In Skills**:
    *   Use `references/` for large schemas, API docs, and long guides.
    *   Use `scripts/` for complex logic.
    *   **Benefit**: Keeps the primary context (SKILL.md) extremely small and token-efficient.

## 5. Pipeline Pattern (Sequential Orchestration)
*   **Concept**: Connecting modular pieces into a line.
*   **In Skills**:
    *   Define a clear 1-2-3-4 workflow.
    *   Example: `Fetch Data` (Tool Wrapper) -> `Reason` -> `Draft` (Generator) -> `Verify` (Reviewer).
*   **Benefit**: Makes complex tasks predictable and easier to debug.
