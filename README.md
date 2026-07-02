# HOF — House of Fans

A mobile-first prototype where sports fans find and join watch events at bars and venues.
The goal: cure loneliness by helping people connect through shared sports interests.

Built as an interactive, clickable demo of the full product flow — from onboarding to
finding events, joining them, and chatting with hosts.

## Tech stack

- **React + TypeScript + Vite**
- **React Router** for navigation
- Inline styles / a small design system (primary `#007860`)
- Mobile-first: every screen is built inside a 390px shell

## Key flows & interactions

- **Discover** — pick your sports (card grid) and dates (calendar) to find matching events
- **Home** — browse events, search, filter, switch to an interactive **map**
- **Event detail** — Join an event → confirmation banner + button flips to "Cancel"
- **Map** — sport pins on a real map; tap a pin for a slide-up event card
- **Chats** — per-conversation chat with live message sending
- **Profile / Favorites / Reviews**

Demo state (joined events, chat history) **persists across page refreshes** via `localStorage`.

## Run locally

```bash
npm install
npm run dev
```

Then open the printed URL (usually http://localhost:5173).

## Build for production

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build locally
```

## Deploy (Vercel)

This is a static single-page app. `vercel.json` includes an SPA rewrite so deep links
(e.g. `/map`, `/discover`) work on refresh.

1. Push this repo to GitHub.
2. On [vercel.com](https://vercel.com), "Add New → Project" and import the repo.
3. Framework preset auto-detects **Vite** (build: `npm run build`, output: `dist`).
4. Deploy — you get a public URL to share.

---

_Prototype for portfolio / demo purposes. Content and events are dummy data._
