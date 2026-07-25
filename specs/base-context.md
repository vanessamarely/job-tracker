# Base Context — Job Tracker

## Qué es esta app
Job Tracker es una aplicación web para gestionar postulaciones laborales. Permite al usuario:
1. Agregar ofertas de trabajo con empresa, cargo, descripción y URL
2. Llevar el estado de cada postulación (wishlist → applied → interviewing → offer / rejected)
3. Adaptar su CV base a cada oferta específica
4. Redactar cartas de interés por postulación
5. Registrar notas de entrevistas técnicas y de recursos humanos

## Stack técnico
Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Drizzle ORM · SQLite · Zod · Vitest

## Tablas principales
- `jobs`: id, empresa, cargo, url, descripcion, estado, salary, priority, adapted_cv, cover_letter, interview_notes, deadline, created_at, updated_at
- `profile`: id(=1), name, email, title, base_cv, skills

## Rutas de la app
- `/` — Dashboard con stats y pipeline
- `/jobs` — Lista de postulaciones (filtro por estado)
- `/jobs/[id]` — Detalle: descripción · CV adaptado · carta · notas
- `/profile` — CV base y datos personales

## Layout
- `AppShell.tsx` (Client) gestiona el estado del sidebar y renderiza: overlay · `Sidebar` · `MobileHeader` · `<main>`
- Sidebar: fijo en desktop, slide-over en móvil (hamburger en top bar)
- Breakpoint responsive: `lg` (1024 px)

## Convenciones
- Idioma de la UI: español
- Validación con Zod en todo punto de entrada
- API routes en `/api/*`, solo POST/PATCH/DELETE
- Server Components para lectura, Client Components para interacción
- Padding de páginas: `px-4 py-6 md:px-8 md:py-8`
