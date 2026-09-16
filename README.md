CheckMate ✅

A categorized to-do list app to keep tasks and deadlines neat and tidy — built for organizing school, extracurriculars, and everything in between.

Access it here: https://categorized-todo-list-sandy.vercel.app/

Features
Categories — Group tasks and deadlines under custom categories (e.g. School, Extracurricular) with a pick from 10 icons and matching pastel colors.
Tasks — Add tasks with details, priority (high/medium/low), and effort level, and mark them complete.
Deadlines — Track dated items separately from tasks, with the same complete/edit/delete controls.
Three views:
All Tasks — every task across all categories in one list
All Deadlines — every deadline across all categories in one list
Categories — browse and manage tasks/deadlines category by category, and add/edit/delete categories
Persistent storage — everything is saved to localStorage, so your data survives a page refresh.
Tech Stack
React 18 + TypeScript
Vite — build tool and dev server
Tailwind CSS 4 — styling
Radix UI primitives + shadcn/ui components
lucide-react — icons
Material UI components (@mui/material)
react-dnd — drag and drop
Motion — animations

This project was originally scaffolded with Figma Make.

Getting Started
Prerequisites
Node.js (recent LTS recommended)
npm (or pnpm/yarn)
Installation
bash
git clone https://github.com/shravya-maloo/checkmate.git
cd checkmate
npm install
Development
bash
npm run dev

This starts the Vite dev server (check your terminal output for the local URL, typically http://localhost:5173).

Build
bash
npm run build

Builds a production-ready bundle.

Project Structure
checkmate/
├── index.html                  # App entry HTML
├── src/
│   ├── main.tsx                 # React entry point
│   ├── styles/                  # Global styles
│   └── app/
│       ├── App.tsx              # Root component, state, and tab layout
│       ├── components/
│       │   ├── AllTasksView.tsx
│       │   ├── AllDeadlinesView.tsx
│       │   ├── CategoriesView.tsx
│       │   ├── CategoryView.tsx
│       │   ├── TaskInput.tsx / TaskItem.tsx
│       │   ├── DeadlineInput.tsx / DeadlineItem.tsx
│       │   ├── IconPicker.tsx
│       │   ├── ui/              # shadcn/ui-based component library
│       │   └── figma/           # Figma Make helper components
│       └── utils/
│           └── iconMap.tsx      # Category icon + color mappings
├── public/
│   ├── checkmatelogo.png
│   └── manifest.json            # PWA manifest
└── vite.config.ts
Data Model
Category — id, name, icon
Task — id, name, details, priority, effort, completed, categoryId
Deadline — id, name, details, date, completed, categoryId

All three collections are persisted independently in localStorage under the keys categories, tasks, and deadlines.

Attributions

This project includes components from shadcn/ui (MIT licensed) and, where applicable, photos from Unsplash. See ATTRIBUTIONS.md for details.

License

No license file is currently included in this repository — add one if you plan to share or distribute this project.
