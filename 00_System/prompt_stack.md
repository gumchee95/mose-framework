# Workspace: Mosa-framework (2026-05-01)

## System Constraints
- Architecture: MOSA v2.5 (Skill-Centric)
- Token Shield: Active (`graphify-out/GRAPH_REPORT.md`)
- Output Format: Point form (<10 words per line)

## Architectural Achievements
- [2026-05-01] **Core Agent Migration**: Successfully migrated all legacy agents from `workflows/` to `skills/` directory.
- [2026-05-01] **Registry Harmonization**: Unified `skills_registry.json` to treat Agents as first-class Skills.
- [2026-05-01] **Protocol Alignment**: Updated `GEMINI.md` Rule 82 to deprecate `workflows/` definition path.

## Ongoing Technical Debt
- Legacy files in `workflows/` kept for user reference but should not be used for logic.
