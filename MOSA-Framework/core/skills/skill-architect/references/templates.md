---
skill_id: "REFERENCES"
category: "Core"
tags: []
complexity: "Medium"
---
# Skill Templates (Google Pattern Based)

Use these structural templates when architecting new skills.

## Template A: Data-Heavy Skill (Tool Wrapper + Pipeline)
*   **Structure**:
    *   `scripts/`: Python scripts for DB queries, API calls, or data crunching.
    *   `references/schema.md`: Detailed field definitions.
*   **Workflow**:
    1.  Read `schema.md`.
    2.  Execute `scripts/query.py`.
    3.  Analyze the JSON output.
    4.  Format the response.

## Template B: Content Generation Skill (Generator + Reviewer)
*   **Structure**:
    *   `references/brand_voice.md`: Guidelines for the tone.
    *   `assets/template.docx`: The target document structure.
*   **Workflow**:
    1.  Generate draft based on `brand_voice.md`.
    2.  Review draft against "Compliance Checklist" (Reviewer).
    3.  If fails, regenerate specific sections.
    4.  Apply to `assets/template.docx`.

## Template C: System Architect Skill (Inversion)
*   **Structure**:
    *   `SKILL.md`: High-level reasoning and gating only.
    *   `references/*.md`: Each domain (e.g., networking.md, security.md) in a separate file.
*   **Workflow**:
    1.  Identify which domain the user's request pertains to.
    2.  Read ONLY the relevant `references/domain.md` file.
    3.  Execute domain-specific logic.
