# NextLevel Food (Foodies App)

**NextLevel Food** is a full-stack recipe-sharing web app where food lovers can discover, browse, and share meal recipes. It’s built with the Next.js App Router and TypeScript as a learning project (inspired by Maximilian Schwarzmüller’s Next.js course), and demonstrates modern patterns like server components, server actions, and local data persistence.

---

## What It Does

- **Browse meals** — View a grid of community recipes with images, titles, summaries, and creator info. Each meal has a dedicated page with a clean URL (e.g. `/meals/wiener-schnitzel`).
- **Share meals** — Submit your own recipe via a form: title, summary, step-by-step instructions, creator name/email, and an image. Submissions are validated, sanitized (XSS), and stored in a local SQLite database; images are saved to disk.
- **Community** — A dedicated community page that explains the value of joining: sharing recipes, meeting like-minded people, and participating in events.
- **Polished UX** — Responsive layout, image slideshow on the homepage, loading states for the meals list, and error/not-found handling where it matters.

---

## Key Features

| Feature | Description |
|--------|-------------|
| **Meal catalog** | Server-rendered meals list with Suspense and a loading fallback. |
| **Meal detail pages** | Dynamic routes by slug; full recipe with image, summary, and HTML instructions. |
| **Share a meal** | Server action form with validation, image upload, slug generation (`slugify`), and XSS sanitization (`xss`). |
| **Image handling** | Custom image picker and slideshow components; meal images stored under `public/images`. |
| **Database** | Local SQLite via `better-sqlite3`; schema and seed data in `initdb.ts`. |
| **Navigation** | Shared header with logo and nav links (Browse Meals, Foodies Community). |

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router) |
| **UI** | React 19, TypeScript |
| **Styling** | Tailwind CSS 4, CSS Modules (e.g. homepage, slideshow) |
| **Fonts** | Montserrat (variable), Open Sans via `@fontsource` |
| **Database** | SQLite via `better-sqlite3` |
| **Utilities** | `slugify` (URL-friendly slugs), `xss` (sanitize user HTML) |

---

## Screenshots
![Home Page](https://github.com/user-attachments/assets/247ff2bc-fa65-492a-9f11-496e631a6e07)

## Getting Started

### Prerequisites

- **Node.js** 18+ (or 20+ recommended)
- **npm** (or another Node package manager)

### 1. Clone and install

```bash
git clone <repository-url>
cd foodies-app
npm install
```

### 2. Set up the database

The app expects a SQLite database file `meals.db` in the project root. Use the included script to create the table and seed it with sample meals:

```bash
node initdb.js
```

If you only have the TypeScript version (`initdb.ts`), compile it first or run it with a TypeScript runner (e.g. `npx ts-node initdb.ts`). The script creates the `meals` table and inserts dummy data (e.g. Juicy Cheese Burger, Spicy Curry, Homemade Dumplings, etc.).

### 3. Run the app

**Development:**

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

**Production:**

```bash
npm run build
npm start
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Next.js development server. |
| `npm run build` | Build the app for production. |
| `npm start` | Run the production build. |
| `npm run lint` | Run ESLint. |

---

## Project Structure

```
foodies-app/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # Root layout, metadata, main header
│   ├── page.tsx              # Home: hero, slideshow, “How it works”, CTAs
│   ├── globals.css           # Global styles
│   ├── community/
│   │   └── page.tsx          # Community info and perks
│   ├── meals/
│   │   ├── page.tsx          # Meals list + “Share your recipe” CTA
│   │   ├── loading-out.tsx   # Loading UI for meals
│   │   ├── error.tsx         # Error boundary
│   │   ├── not-found.tsx     # 404 for /meals
│   │   ├── share/
│   │   │   ├── page.tsx      # Share meal form
│   │   │   └── error.tsx     # Share form error boundary
│   │   ├── [mealSlug]/
│   │   │   └── page.tsx      # Single meal detail (dynamic route)
│   │   └── ImagePicker/      # Meal image picker component
│   └── not-found.tsx         # Global 404
├── components/
│   ├── mainHeader/           # Logo, nav (Browse Meals, Foodies Community)
│   ├── Meals/                # MealsGrid, MealItem, MealsFrormSubmit
│   ├── images/               # Image slideshow (home)
│   └── NavLink/              # Nav link component
├── lib/
│   ├── meals.ts              # DB access: getMeals, getMealBySlug, saveMeal
│   └── actions.ts            # Server action: shareMeal
├── public/                   # Static assets (e.g. images, icons)
├── types/
│   └── better-sqlite3.d.ts   # TypeScript types for better-sqlite3
├── initdb.ts                 # DB schema + seed data (run to create meals.db)
├── meals.db                  # SQLite DB (created by init script)
└── package.json
```

---

## Database

- **File:** `meals.db` (SQLite, created by `initdb`).
- **Table:** `meals` — `id`, `slug`, `title`, `image`, `summary`, `instructions`, `creator`, `creator_email`.
- **Seeding:** `initdb.ts` (or compiled `initdb.js`) creates the table and inserts sample meals. Run it once before using the app.
- **Writing:** New meals are added via the “Share your meal” form; `lib/meals.ts` handles file uploads and inserts.

---

## Notes

- This is an **educational/demo** project. .
- Good for learning: App Router, server components, server actions, dynamic routes, loading/error/not-found UI, and form handling with a local database.

---

## License

This project is provided for learning purposes.
