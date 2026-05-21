<div align="center">
  <h1>✨ MOSA Framework</h1>
  <p><strong>Markdown-Oriented Skill Architecture</strong></p>
  <p><em>The ultimate, token-efficient, context-aware framework for scaling autonomous AI agents.</em></p>
</div>

---

## 🚀 What is MOSA?

**MOSA (Markdown-Oriented Skill Architecture)** is a paradigm-shifting orchestration framework designed to run multi-agent, context-heavy AI systems efficiently.

By treating agents as pure "SOP Execution Machines" and passing only **pointers** (file paths) instead of raw data, MOSA drastically reduces token bloat while scaling infinite capabilities through modular Markdown skills.

---

## 🧩 The MOSA Workflow (Diagram)

Below is the execution topology and how the different components interact within the MOSA ecosystem.

```mermaid
graph TD
    User(("🧑 User Request")) --> Host["💻 Host Agent (Context Sniffing)"]
    Host -- Checks rules --> GEMINI["📜 GEMINI.md (Global Rules)"]
    Host --> Orch["🧠 Orchestrator Agent (Layer A/B)"]
    
    subgraph Routing & Delegation
        Orch -- "Intent & Keywords" --> Router["🧭 Router Agent"]
        Router -- "Queries" --> Registry[("🗂️ skills_registry.json")]
        Router -- "Returns Pointers" --> Orch
    end

    subgraph Execution (Layer C)
        Orch -- "Delegates SOP" --> Coder["👨‍💻 Coder Agent"]
        Orch -- "Delegates SOP" --> Admin["💼 Admin Agent"]
        Orch -- "Delegates SOP" --> Design["🎨 Design Agent"]
        Orch -- "Delegates SOP" --> Market["📈 Market Agent"]
    end
    
    subgraph Evolution & Maintenance
        Auto["⚙️ Auto-Skill"] -- "Extracts Experience" --> KB[("📚 Knowledge Base")]
        Creator["🏗️ Skill-Creator & Architect"] -- "Builds New Skills" --> SkillsDir["📂 skills/"]
        Distiller["🗜️ Registry Distiller"] -- "Compiles & Updates" --> Registry
    end

    Coder & Admin & Design & Market --> Auto
```

---

## 💾 The Shared Memory Bus: `context_bus.json`

To prevent massive token bloat during multi-agent handoffs, MOSA implements a stateless **Shared Memory Bus** (`01_Work/context_bus.json`).

### How It Works

Instead of feeding an agent the entire historical chat context of what other agents did, agents output structured JSON values (such as file pointers, configuration metrics, schema definitions).

1. **Write**: When an Execution Sub-Agent (e.g., `market_agent`) finishes its task, the **Orchestrator** extracts its output variables and writes them to `01_Work/context_bus.json`.
2. **Read & Inject**: When the Orchestrator assigns a task to the next agent in the pipeline (e.g., `design_agent`), it reads `context_bus.json` and injects it as a compact `[Shared_Context: ...]` header.
3. **Pointers Only**: Large data outputs (like large tables or code snippets) are saved to disk, and only their file path pointers are put on the bus.

### Concrete Example of `context_bus.json`

During a typical cooperative task (like planning a corporate event), the `context_bus.json` evolves step-by-step:

```json
{
  "project_scope": {
    "event_type": "Gala Dinner",
    "attendees": 200,
    "budget_regime": "Break-Even",
    "milestones_path": "01_Work/milestones.json"
  },
  "marketing_strategy": {
    "psychology_hook": "Loss Aversion / Early Bird Exclusivity",
    "theme": "Vibrant Neon Classic",
    "copywriting_draft_path": "01_Work/marketing_copy.md"
  },
  "technical_infrastructure": {
    "database_schema": {
      "attendee_table": ["ID", "Name", "TicketType", "SerialNo", "CheckInTime"]
    },
    "script_path": "01_Work/registration_sync.js"
  }
}
```

By reading this small, structured JSON (~400 tokens), the `design_agent` immediately knows it must render a mockup matching the "Vibrant Neon Classic" theme for a "Gala Dinner" accommodating "200 attendees", without having to read the thousands of tokens of discussion between the user, the project planner, and the marketing agent!

---

## 🏗️ The Skill Factory: Building & Maintaining the Ecosystem

MOSA isn't just about executing tasks; it's designed to **build itself**. The following components handle the creation, architecture, and registry maintenance of the skills.

### 🗜️ Registry Distiller (`base-distiller`)
The **Registry Distiller** is the indexer of the ecosystem. As new skills are dynamically added, the distiller automatically parses the `skills/` directory and compiles/updates the central `skills_registry.json`. 
- **How it works**: It distills all the YAML frontmatter (Skill ID, Description, Category, Dependencies) from every `SKILL.md` file and condenses them into a highly-efficient, single JSON file. This allows the Router Agent to instantly find the right skill without spending tokens reading every single markdown file.

### 🏛️ Skill Architect
Before writing code, the **Skill Architect** acts as the system design layer. It uses Google Cloud's core design patterns (Tool Wrapper, Generator, Reviewer, Inversion, Pipeline) to architect high-quality, composable, and token-efficient Agent Skills. It ensures that new skills fit perfectly into the MOSA pointer-passing architecture.

### 🛠️ Skill Creator
Once the architecture is decided, the **Skill Creator** scaffolds the actual skill. It automates the boilerplate setup, applying Anthropic's official best practices with zero manual configuration. It handles:
- Creating the `SKILL.md` with correct YAML frontmatter.
- Setting up the `scripts/`, `references/`, and `assets/` directories.
- Registering the skill so the Distiller can pick it up.

---

## ⚖️ The Truth Function: Audit & Capability Verification

A core component of MOSA is its **Truth Function**—an embedded verification and auditing layer that ensures the framework operates at peak token efficiency and maintains architectural integrity across complex, multi-agent tasks.

### Verifiable Token Optimization
The Truth Function mathematically audits system efficiency. By using the Context Bus and the Token Shield (`GRAPH_REPORT.md`), MOSA achieves massive savings over traditional agents:
- **Workspace Init**: ~75% Token Savings (Agents read `GRAPH_REPORT.md` God Nodes instead of full-directory scans).
- **Inter-Agent Handoff**: ~95% Token Savings (Agents pass JSON metadata and pointers instead of full source files).
- **Overall Pipeline Run**: ~72.5% Token Savings.

### Audit Agent (`audit-agent`)
The `audit-agent` serves as the Chief Compliance Officer. It actively monitors the `Agent_Activation_Log.md` and `session_state.json` to:
- Detect duplicate tool calls or looping behaviors (Token Efficiency Protocol).
- Ensure output protocols (like the strict "Pointers Only" and "ff mode") are followed.
- Inject atomic patches if it detects agents drifting from the original `prompt_stack.md` mission.

---

## 🎬 How it Works (Cooperative Execution Example)

Imagine asking your AI: *"Analyze the Q3 financials and generate a dashboard mockup."*

Here is how MOSA elegantly handles this complex, multi-domain task:

1.  **Context Sniffing**: The system checks if it has the global rules loaded. It spins up the **Orchestrator Agent**.
2.  **Atomic Decomposition**: The Orchestrator breaks down the prompt into `[Financial Analysis]` and `[Dashboard UI Mockup]`.
3.  **Smart Routing**: The Orchestrator pings the **Router Agent**, which quickly checks the `skills_registry.json` (maintained by the Distiller) to match the keywords to `/market_agent` and `/design_agent`.
4.  **Cooperative Delegation & Context Bus Handoff**:
    - `market_agent` runs the analysis, saves a CSV, and writes the *pointer* to `session_state.json` and output details to `context_bus.json` (`{"financial_report": "01_Work/q3_financials.csv"}`).
    - `design_agent` reads the pointer from `context_bus.json` and drafts a beautiful dashboard component matching the financial numbers.
5.  **Audit & Wrap-Up**: `auto-skill` prompts: *"I noticed you used a unique chart configuration. Should I save this experience for next time?"* If it's a massive breakthrough, it triggers **Skill Architect** to mint a brand new skill!

---

## 🛠️ Getting Started

1. **Bootstrap Workspace**: In any directory, run the initialization to generate `00_System`, `01_Work`, and `02_Output`.
2. **Compile Registry**: Run the `Registry Distiller` to generate your initial `skills_registry.json`.
3. **Trigger the Orchestrator**: Give a complex prompt, and let the Orchestrator seamlessly break it down!
