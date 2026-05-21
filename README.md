<div align="center">
  <h1>✨ MOSA Framework</h1>
  <p><strong>Markdown-Oriented Skill Architecture</strong></p>
  <p><em>The ultimate, token-efficient, context-aware framework for scaling autonomous AI agents.</em></p>
</div>

---

## 🚀 What is MOSA?

**MOSA (Markdown-Oriented Skill Architecture)** is a paradigm-shifting orchestration framework designed to run multi-agent, context-heavy AI systems efficiently.

Tired of AI agents forgetting context, repeating full codebases, and hitting token limits? MOSA solves this. By treating agents as pure "SOP Execution Machines" and passing only **pointers** (file paths) instead of raw data, MOSA drastically reduces token bloat while scaling infinite capabilities through modular Markdown skills.

### Why Choose MOSA?
- **Pointers Only**: No more token spillage. Agents pass data through `session_state.json` and file paths instead of dumping massive tables into the chat.
- **Token Shielding**: Utilizes knowledge graphs (`GRAPH_REPORT.md`) to restrict agents from aimless full-directory scanning. Saves 30-50% in token consumption!
- **Auto-Evolution**: Built-in `auto-skill` ensures the framework continuously extracts generalized experience and creates its own SOPs over time.
- **Strict Role Boundaries**: The Orchestrator plans, the Router matches skills, and Execution Sub-Agents (Coder, Admin, Market, etc.) simply *execute*.

---

## 🧠 The Architecture (Layer by Layer)

MOSA is structured into highly cohesive, loosely coupled layers:

*   **Layer A (Global Protocols):** Dictated by `GEMINI.md`. This is the constitutional rulebook handling workspace isolation and startup sequences.
*   **Layer B (Routing Engine):** The Router Agent maps user intents to the best 1-3 Markdown skills out of hundreds without reading all of them (using Mosa Skeleton search).
*   **Layer C (Execution Sub-Agents):** SOP-driven specialists.
    *   `admin_agent` (HR, Ops, Workflow)
    *   `coder_agent` (Python, SQL, Technical tests)
    *   `market_agent` (Finance, Macro, Buy-side)
    *   `design_agent` (Frontend, Canvas, UX)
*   **Layer D (Persistence & Shielding):** Orchestrator limits agents to the current `00_System` workspace, strictly garbage-collecting temporary state JSONs upon task completion.

---

## 🎬 How it Works (Marketing Example)

Imagine asking your AI: *"Analyze the Q3 financials and generate a dashboard mockup."*

Here is how MOSA elegantly handles this complex, multi-domain task:

1.  **Context Sniffing**: The system checks if it has the global rules loaded. It spins up the **Orchestrator Agent**.
2.  **Atomic Decomposition**: The Orchestrator breaks down the prompt into: 
    - `[Financial Analysis]`
    - `[Dashboard UI Mockup]`
3.  **Smart Routing**: The Orchestrator pings the **Router Agent**. The Router matches the keywords to `/market_agent` for financials, and `/design_agent` for the mockup.
4.  **Cooperative Delegation**:
    - The Orchestrator assigns the financial task to `market_agent`. `market_agent` runs the analysis, saves a CSV, and writes the *pointer* to `session_state.json`.
    - Next, the Orchestrator assigns the UI task to `design_agent`, passing the *pointer* to the CSV. `design_agent` reads the CSV and drafts a beautiful dashboard component.
5.  **Audit & Wrap-Up**: The `audit_agent` optionally reviews the output. Finally, `auto-skill` prompts: *"I noticed you used a unique chart configuration. Should I save this experience for next time?"*

**Result**: A perfect, specialized execution pipeline—all without dropping context or consuming excessive tokens!

---

## 🛠️ Getting Started

To initialize MOSA in your environment:

1. **Bootstrap Workspace**: In any directory, run the initialization to generate `00_System`, `01_Work`, and `02_Output`.
2. **Load the Meta-Logic**: Ensure `skills/auto-skill/SKILL.md` is loaded into context.
3. **Trigger the Orchestrator**: Just give a complex prompt, and let the Orchestrator seamlessly break it down and trigger the routing sequence.

---
<div align="center">
  <p>Built with ❤️ for High-Performance Autonomous Agents.</p>
</div>
