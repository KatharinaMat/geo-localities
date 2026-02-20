# Geological Localities Browser

A small responsive Nuxt application that allows users to browse geological localities from a public API.

**Live Demo:** https://geo-localities.vercel.app/

---

## Features

- Fetches geological localities from a public API
- Displays locality name, ID and country
- Server-side search with debounced input
- Pagination with Next / Previous navigation
- Graceful error handling with retry option
- Empty state when no results are found
- Responsive and tidy UI

---

## Technical Approach

The project is built using **Nuxt (Composition API)** with a focus on clean architecture:

- **pages/** – page-level layout and routing
- **components/** – reusable UI components (LocalityCard)
- **composables/** – data fetching and state logic (`useLocalities`)
- Scoped component styling with small global design adjustments

Data fetching uses Nuxt's `useFetch`, combined with debounced search and safe fallbacks to handle incomplete API responses.

---

## Data Source

Public API:  
https://rwapi.geoloogia.info/api/v1/public/localities

The `expand=country` parameter is used to retrieve readable country names.

---

## Running Locally

```bash
git clone <your-repo-url>
cd <project-folder>
npm install
npm run dev
```
