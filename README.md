# CheckMate

CheckMate is a categorized to-do list app for keeping tasks and deadlines neat and organized. Create categories, manage tasks and deadlines, and keep everything in one place for school, extracurriculars, and everything in between.

Access it here: https://categorized-todo-list-sandy.vercel.app/

## Features

- 📚 **Categories** — Organize tasks and deadlines under custom categories such as School and Extracurriculars, with 10 icons and matching pastel colors to personalize each one
- ✅ **Tasks** — Add tasks with details, priority (high / medium / low), and effort level, then mark them complete when finished
- 📅 **Deadlines** — Keep track of dated items separately from tasks, with the same edit, complete, and delete controls
- 🗂️ **Three views** — Switch between:
  - **All Tasks** — every task across all categories in one place
  - **All Deadlines** — every deadline across all categories
  - **Categories** — browse and manage tasks, deadlines, and categories individually
- 💾 **Persistent storage** — All data is saved to `localStorage`, so your tasks, deadlines, and categories remain after refreshing the page
- 🎨 **Clean, colorful UI** — Pastel category colors, custom icons, and a simple interface designed to make organizing your workload easier

## Tech stack

- **React 18** + **TypeScript**
- **Vite** — build tool and development server
- **Tailwind CSS v4** — styling
- **Radix UI** + **shadcn/ui** — accessible UI primitives and components
- **Material UI** — additional UI components
- **lucide-react** — icons
- **react-dnd** — drag and drop interactions
- **Motion** — animations

This project was originally scaffolded with **Figma Make**.

## Project structure

```text
checkmate/
├── index.html                  # App entry HTML
├── src/
│   ├── main.tsx                # React entry point
│   ├── styles/                 # Global styles
│   └── app/
│       ├── App.tsx             # Root component, state, and tab layout
│       ├── components/
│       │   ├── AllTasksView.tsx
│       │   ├── AllDeadlinesView.tsx
│       │   ├── CategoriesView.tsx
│       │   ├── CategoryView.tsx
│       │   ├── TaskInput.tsx
│       │   ├── TaskItem.tsx
│       │   ├── DeadlineInput.tsx
│       │   ├── DeadlineItem.tsx
│       │   ├── IconPicker.tsx
│       │   ├── ui/             # shadcn/ui components
│       │   └── figma/          # Figma Make helper components
│       └── utils/
│           └── iconMap.tsx     # Category icon + color mappings
├── public/
│   ├── checkmatelogo.png
│   └── manifest.json           # PWA manifest
└── vite.config.ts
```

## Data model

CheckMate stores three collections independently in `localStorage`: `categories`, `tasks`, and `deadlines`.

```text
Category
├── id
├── name
└── icon

Task
├── id
├── name
├── details
├── priority
├── effort
├── completed
└── categoryId

Deadline
├── id
├── name
├── details
├── date
├── completed
└── categoryId
