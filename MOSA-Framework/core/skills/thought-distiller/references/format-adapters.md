---
skill_id: "REFERENCES"
category: "Core"
tags: []
complexity: "Medium"
---
# Format Adapters Strategy

Strategies for transforming raw file data into Logic Tokens.

## Excel / CSV (.xlsx, .csv)
- **Extraction**: Identify Header row -> Map Columns to variables.
- **Logic**: Detect hidden formulas ($=IF...$) as Decision Gates.
- **Output**: Transformed Markdown tables with logic annotations.

## Word / Text (.docx, .txt, .md)
- **Extraction**: Heading hierarchy (H1, H2, H3) -> Goal Tree.
- **Logic**: Bold text/Bullet points as Atomic Actions.
- **Output**: A sequential Process Map.

## PDF (.pdf)
- **Extraction**: Text layers + TOC.
- **Logic**: Use Regex for "Shall/May/Should" keywords to determine freedom levels.
- **Output**: Simplified requirement list.

## PowerPoint (.pptx)
- **Extraction**: Notes + Slide Titles.
- **Logic**: Visual flow (Slide 1 -> Slide 2) as Workflow steps.
- **Output**: High-level Roadmap.

## Source Code (.py, .js, .go, etc.)
- **Extraction**: Function signatures + Comments.
- **Logic**: Control flow (loops, try-catch) as Error Handling gates.
- **Output**: API/Functional interface guide.
