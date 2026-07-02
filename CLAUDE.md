# HOF App — Claude Guidelines

## Project Overview

HOF (House of Fans) is a mobile app where sports fans find and join watch events at bars/venues. The goal is to cure loneliness and help people connect through shared sports interests.

## Tech Stack

- **Framework:** React + TypeScript + Vite
- **Styling:** Tailwind CSS
- **Target:** Mobile-first, displayed in a 390px wide shell centered on desktop

## Design System

| Token | Value | Usage |
|---|---|---|
| Primary | `#007860` | Headings, primary buttons |
| Secondary | `#006b56` | Button hover states |
| Accent | teal | Links, highlights |
| Background | `#FFFFFF` | Page backgrounds |

**Component rules:**
- Buttons: rounded, full width
- No drop shadows
- Input fields: 1px border
- Font: system default

## App Flows

```
Splash → Login → Signup → Onboarding (6 steps) → Home → Event Detail → Chat
```

## Development Rules

- **Always build screens as mobile-first components inside a 390px container.** Never stretch layouts to full desktop width.
- Keep the mobile shell wrapper intact — do not remove or modify the centering shell.
- New screens go inside the same 390px constraint as existing screens.
- Prefer editing existing files over creating new ones.
- Do not add features, refactors, or "improvements" beyond what is asked.

## Efficiency Rules

- For any visual fix under 3 lines of code change (spacing, color, padding, font size, alignment), make the change directly without asking for confirmation first.
- When rebuilding a screen from Figma, always download all assets immediately to /public/assets — never reference localhost:3845.
- Never suggest improvements or make unsolicited changes to the design — match Figma exactly unless Razzaq explicitly asks for suggestions.
- When Razzaq says "fix X", fix only X — do not refactor or change anything else in the file.
- Always read CLAUDE.md at the start of every new session before doing anything.
- Batch small fixes together into one operation instead of asking permission for each one separately.
