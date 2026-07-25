---
name: add-feature
description: Plantilla para agregar una nueva feature al job-tracker
---

Quiero agregar la siguiente feature al job-tracker:

**Feature:** [DESCRIBE LA FEATURE AQUÍ EN UNA ORACIÓN]

---

## Contexto del proyecto

- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript
- **Estilos:** Tailwind CSS v4
- **DB:** Drizzle ORM + better-sqlite3 (SQLite local) — schema en `drizzle/schema.ts`
- **Validación:** Zod v4 — siempre, en todo punto de entrada
- **Tests:** Vitest + React Testing Library

## Archivos clave del proyecto

```
src/
  app/
    page.tsx              ← Dashboard (Server Component)
    jobs/
      page.tsx            ← Lista de jobs
      [id]/page.tsx       ← Detalle del job
    profile/page.tsx      ← Perfil y CV base
    api/
      jobs/route.ts       ← GET, POST
      jobs/[id]/route.ts  ← GET, PATCH, DELETE
      profile/route.ts    ← GET, PATCH
  components/
    AppShell.tsx          ← Layout shell (Client, estado del sidebar)
    Sidebar.tsx           ← Navegación lateral responsive (Client)
    MobileHeader.tsx      ← Top bar hamburger, solo móvil (Client)
    JobCard.tsx
    JobForm.tsx
    JobDetailTabs.tsx
    JobDetailActions.tsx
    JobsFilter.tsx
    ProfileForm.tsx
    StatsCard.tsx
    StatusBadge.tsx
    AddJobButton.tsx
  lib/
    db.ts                 ← Queries (solo servidor)
    validations.ts        ← Zod schemas (cliente + servidor)
  types/
    index.ts              ← Interfaces TypeScript
drizzle/
  schema.ts               ← Tablas: jobs, profile
```

## Descripción de la feature

[DESCRIBE EN DETALLE QUÉ DEBE HACER LA FEATURE]

## Archivos que probablemente involucra

- [ ] `src/components/` — si tiene UI nueva
- [ ] `src/app/api/` — si necesita endpoints nuevos o modificados
- [ ] `src/lib/db.ts` — si agrega/modifica queries
- [ ] `drizzle/schema.ts` — SOLO si cambia el schema (requiere migración)
- [ ] `src/lib/validations.ts` — si agrega validaciones Zod
- [ ] `src/types/index.ts` — si agrega tipos nuevos

## Restricciones

- No modificar el schema existente de `jobs` ni `profile` salvo que sea estrictamente necesario
- No instalar nuevas dependencias sin mencionarlo explícitamente
- Mantener el patrón de Server Components para páginas que solo leen datos
- Mensajes de error en español

## Criterios de aceptación

- [ ] [CRITERIO VERIFICABLE 1]
- [ ] [CRITERIO VERIFICABLE 2]
- [ ] [CRITERIO VERIFICABLE 3]
- [ ] Los tests existentes siguen pasando: `npm run test -- --run`
- [ ] El build compila sin errores: `npm run build`
