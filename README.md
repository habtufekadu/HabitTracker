# HabitTracker

A simple web app to build and track daily habits — with streaks.

## Why This Exists

Building habits is hard without visible progress. HabitTracker lets you 
add habits, check them off daily, and watch your streak grow. 
All data is saved in your browser, so it's still there whenAdd new habits
- Check off habits daily
- See your current streak (consecutive days)
- Delete habits
- Data persists across refreshes (localStorage)
- Responsive design for mobile

## Tech Stack

- **HTML** — page structure
- **CSS** — styling and responsive layout
- **JavaScript** — app logic
- **localStorage** — browser-based data persistence

No frameworks. No build tools. Just the fundamentals.

## How It Works

- `js/storage.js` handles saving and loading habits from `localStorage`.
- `js/script.js` contains all app logic:
  - Renders the habit list
  - Handles adding, checking, and deleting habits
  - Calculates streaks by walking backwards from today
  - Updates the summary at the bottom

- Each habit is stored as an object:

  ```javascript
  {
    id: 1234567890,
    name: "Read 10 pages",
    createdAt: "2026-10-16",
    history: ["2026-10-16", "2026-10-17"]
  }