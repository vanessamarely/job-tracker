# Job Tracker — Copilot Instructions

## Stack
- **Framework**: Next.js 15 (App Router) + React 19
- **Lenguaje**: TypeScript estricto — nunca uses `any`
- **Estilos**: Tailwind CSS v4 (config en CSS, no tailwind.config.js)
- **Base de datos**: Drizzle ORM + better-sqlite3 (SQLite local)
- **Validación**: Zod en todo punto de entrada (API routes, formularios)
- **Íconos**: lucide-react
- **Tests**: Vitest + React Testing Library

## Convenciones
- Componentes: PascalCase (`JobCard.tsx`)
- Funciones/variables: camelCase (`getAllJobs`)
- Rutas API: `/api/jobs`, `/api/jobs/[id]`, `/api/profile`
- Server Components por defecto; `'use client'` solo cuando hay estado o eventos del browser
- Errores en español en la UI

## Reglas de negocio
- `estado` acepta: `wishlist | applied | interviewing | offer | rejected`
- `priority` acepta: `high | medium | low`
- `empresa`: mínimo 2 caracteres, máximo 100
- `cargo`: mínimo 2 caracteres, máximo 200
- `salary`: entero positivo en USD/año, opcional
- Un usuario tiene exactamente un perfil (id=1, singleton)
- El CV adaptado (`adapted_cv`) se inicializa con el CV base del perfil si está vacío

## Restricciones
- No SQL crudo — usa siempre Drizzle ORM
- No `console.log` en producción
- No cambios de schema sin migración (`drizzle-kit generate`)
- Los archivos `src/lib/db.ts` y `drizzle/schema.ts` son **solo servidor** — nunca los importes desde Client Components
- `src/lib/validations.ts` puede importarse en cualquier entorno (cliente/servidor)

## Layout responsive
- El layout usa el patrón **AppShell**: `layout.tsx` (Server) → `AppShell.tsx` (Client, gestiona estado del sidebar)
- `AppShell.tsx` controla `sidebarOpen` y renderiza: backdrop overlay · `Sidebar` · `MobileHeader` · `<main>`
- `Sidebar.tsx`: `fixed lg:relative` + `translate-x` — overlay en móvil, en flujo en desktop
- `MobileHeader.tsx`: solo visible en `< lg`, muestra logo y botón hamburger
- Breakpoint: `lg` (1024 px) — por debajo = móvil, por encima = desktop
- Clases de padding en páginas: `px-4 py-6 md:px-8 md:py-8`
- **Nunca importes `Sidebar` directamente desde `layout.tsx`** — usa siempre `AppShell`

## Estructura de archivos clave
```
drizzle/schema.ts          ← Schema SQLite
src/lib/db.ts              ← Cliente DB + queries (solo servidor)
src/lib/validations.ts     ← Zod schemas (cliente + servidor)
src/types/index.ts         ← Interfaces TypeScript
src/components/
  AppShell.tsx             ← Layout shell con estado del sidebar (Client)
  Sidebar.tsx              ← Navegación lateral responsive (Client)
  MobileHeader.tsx         ← Top bar con hamburger, solo móvil (Client)
  JobCard.tsx
  JobForm.tsx
  JobDetailTabs.tsx
  JobDetailActions.tsx
  JobsFilter.tsx
  ProfileForm.tsx
  AddJobButton.tsx
  StatsCard.tsx
  StatusBadge.tsx
src/app/api/               ← API Routes (Next.js)
src/app/page.tsx           ← Dashboard
src/app/jobs/              ← Lista y detalle de postulaciones
src/app/profile/           ← Perfil y CV base
```
