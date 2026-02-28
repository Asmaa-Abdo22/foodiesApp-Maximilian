# Foodies App

Foodies App is a small demo web application built while following Maximilian Schwarzmüller's Next.js course. It showcases core Next.js (App Router) features, TypeScript usage, and simple data handling to browse, share, and manage meal entries.

## Key Features

- Browse meals with dedicated pages and clean URLs
- Image picker and image slideshow components for meal images
- Share meals and a simple community page for shared content
- Server-side data handling using a small local DB script (see `initdb.ts`)

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind css
- Optional local database setup (project includes `initdb.ts` and `types/better-sqlite3.d.ts`)

## Screenshots
![Home Page](https://github.com/user-attachments/assets/247ff2bc-fa65-492a-9f11-496e631a6e07)

## Getting Started

Prerequisites:

- Node.js (14+ recommended)

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

Production build:

```bash
npm run build
npm start
```

## Database

This repository includes an `initdb.ts` script used to create or populate a small local database for demonstration. If you want to use it, run it with a TypeScript runner such as `ts-node` or compile it first. See the file for implementation details.

## Project Structure

- `app/` – Next.js App Router pages and layouts
- `components/` – Reusable React components (headers, meal items, image slideshow, etc.)
- `lib/` – App utilities (data fetchers, actions)
- `public/` and `assets/` – Static images and icons
- `types/` – Local type declarations

## Notes

This is an educational project and not intended for production use. It’s a great reference for learning how to structure Next.js apps with the App Router and TypeScript.

## License

This project is provided for learning purposes.
