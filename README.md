# Sanjivani Homeopathic Clinic — web app

Full-stack site for a homeopathy practice: public pages, appointment and contact forms, SQLite database via Prisma, and a password-protected admin dashboard.

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ (includes `npm`)

## Setup

1. Copy environment variables and edit secrets:

   ```bash
   copy .env.example .env
   ```

   On macOS/Linux: `cp .env.example .env`

   Set `ADMIN_PASSWORD` and `SESSION_SECRET` to strong values before production.

   To email **website error reports** to the doctor, set `DOCTOR_EMAIL` and SMTP (`SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, etc.) in `.env`. Reports are always stored in the database; email is sent when SMTP is configured.

2. Install dependencies and create the database:

   ```bash
   npm install
   npm run db:push
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000). Admin dashboard: [http://localhost:3000/admin](http://localhost:3000/admin) (use `ADMIN_PASSWORD` from `.env`).

## Scripts

| Command        | Description                          |
| -------------- | ------------------------------------ |
| `npm run dev`  | Development server                   |
| `npm run build`| Production build (runs Prisma generate) |
| `npm run start`| Production server                    |
| `npm run db:push` | Apply Prisma schema to SQLite     |
| `npm run db:studio` | Browse data in Prisma Studio   |

## Stack

- **Next.js 14** (App Router) — UI + API routes
- **Prisma** + **SQLite** — `prisma/dev.db` (gitignored)
- **Tailwind CSS** — styling

## Data model

- **Appointment** — booking requests with status (`PENDING` / `CONFIRMED` / `CANCELLED`)
- **ContactMessage** — contact form submissions
- **PatientRecord** — optional internal notes (managed from the dashboard)
- **ErrorReport** — public “Report errors” form; optional email to `DOCTOR_EMAIL` when SMTP is set

## Production notes

- Use PostgreSQL (or another hosted DB) by changing `DATABASE_URL` and `provider` in `prisma/schema.prisma`.
- Set `SESSION_SECRET` and `ADMIN_PASSWORD` via your host’s secret manager.
- Enable HTTPS so the admin session cookie can use `secure: true` (already tied to `NODE_ENV`).
