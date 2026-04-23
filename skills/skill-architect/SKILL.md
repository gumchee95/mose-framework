---
name: skill-architect
description: Meta-skill for designing high-quality, composable, and token-efficient
  Agent Skills based on Google Cloud's five core design patterns (Tool Wrapper, Generator,
  Reviewer, Inversion, Pipeline). Use this when you need to architect a new skill
  or refactor an existing one for enterprise-grade reliability and modularity.
skill_id: SKILL_ARCHITECT
category: Core
---

# Skill Architect: Google-Inspired Design Framework

This Meta-Skill guides the creation of Agent Skills using five core design patterns from Google Cloud, ensuring they are robust, scalable, and efficient.

## The Five Core Patterns

1.  **Tool Wrapper**: Encapsulate external tools/scripts. Don't teach the LLM the "how"; give it a standardized "interface" (script) and clear "Docstring" (instructions).
2.  **Generator**: Logic specialized in creating initial drafts or raw content.
3.  **Reviewer**: Logic specialized in validating, critiquing, and refining output against strict criteria.
4.  **Inversion**: Decouple the "what" (instructions) from the "how" (implementation). Use references/ and scripts/ to keep the main SKILL.md lean.
5.  **Pipeline**: Organize complex tasks into sequential, modular stages where output flows from one to the next.

---

## Systematic Workflow

### Phase 1: Requirement Boundary (Planning)
- **Goal**: Define the specific task and success criteria.
- **Output**: A clear `description` for the YAML frontmatter.
- **Rule**: If the description takes more than 3 sentences, part of the logic should be moved to a `reference/` file.

### Phase 2: Pattern Selection & Mapping
Determine which patterns are required:
- **Need external API/Tool?** -> Use **Tool Wrapper**. Create a script in `scripts/`.
- **High creative/text output?** -> Use **Generator**. Define prompt templates in `references/`.
- **Fragile/Critical output?** -> Use **Reviewer**. Add a gating step in the workflow.
- **Multi-step process?** -> Use **Pipeline**. Define a state-aware workflow.

### Phase 3: Component Implementation
- **SKILL.md**: Contains only the high-level orchestration (The "Brain").
- **scripts/**: Contains the deterministic logic (The "Muscles").
- **references/**: Contains the domain knowledge/schemas (The "Memory").
- **assets/**: Contains the fixed templates (The "Skeleton").

### Phase 4: Gating Mechanism (Quality Control)
Before finalizing, verify:
1.  **Token Efficiency**: Is the SKILL.md < 500 lines? If not, move content to `references/`.
2.  **Modularity**: Can components be tested independently?
3.  **Error Handling**: Does the **Reviewer** stage catch common failures?

---

## Detailed Design Guides
- **Pattern Implementations**: See [patterns.md](references/patterns.md)
- **Skill Templates**: See [templates.md](references/templates.md)
- **Validation Checklist**: See [checklist.md](references/checklist.md)

---

## Usage Example
If a user wants a "Resume Reviewer" skill:
1.  **Generator**: Agent extracts text and formats it.
2.  **Tool Wrapper**: Script checks keywords against a job description.
3.  **Reviewer**: Agent compares script results with professional standards.
4.  **Pipeline**: Map these steps in a clear 1-2-3 sequence in SKILL.md.
