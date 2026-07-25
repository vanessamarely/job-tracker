# Job Tracker

Aplicación web para gestionar postulaciones laborales — Next.js + TypeScript + Drizzle. Este repo existe como
**ejemplo de referencia de una configuración avanzada de GitHub Copilot**: instrucciones de proyecto, agentes
personalizados, prompt files reutilizables, skills, specs para desarrollo dirigido por especificación, y un
servidor MCP conectado.

## Configuración de Copilot en este repo

```
.github/
  copilot-instructions.md   ← Contexto permanente: stack, convenciones, reglas de negocio, restricciones
  agents/
    review-agent.agent.md   ← Agente personalizado para code review con estándares del proyecto
  prompts/
    add-feature.prompt.md   ← Plantilla reutilizable para pedir una feature nueva
    fix-bug.prompt.md       ← Plantilla reutilizable para reportar y corregir un bug
  skills/
    review-pr/SKILL.md      ← Skill invocable para revisar un PR
    write-tests/SKILL.md    ← Skill invocable para generar tests
.vscode/
  mcp.json                  ← Servidor MCP de GitHub conectado (issues, PRs, repos)
specs/
  base-context.md           ← Contexto funcional completo de la app (para dar de una vez a un agente)
  export-csv.md             ← Spec de una feature real, lista para ejecutar spec-driven development
```

**`specs/export-csv.md`** es el ejemplo más directo: es una spec completa (contexto, objetivo, restricciones,
criterios de aceptación) de una feature que **todavía no está implementada** en este código. Sirve para practicar
el flujo completo: convertir la spec en un Issue de GitHub, asignárselo a Copilot coding agent (o resolverlo con
Agent Mode en VS Code usando la spec como contexto), y revisar el PR resultante con `review-agent`.

## Stack

- **Next.js 16** (App Router) + React 19 + TypeScript
- **Tailwind CSS v4** — config en CSS, sin `tailwind.config.js`
- **Drizzle ORM** + better-sqlite3 (SQLite local)
- **Zod v4** — validación en todos los puntos de entrada
- **Vitest** + React Testing Library
- **lucide-react** — íconos

## Funcionalidades

- Dashboard con estadísticas y pipeline visual
- CRUD de postulaciones con estados: `wishlist → applied → interviewing → offer / rejected`
- Prioridades: `high / medium / low`
- Tabs por postulación: descripción, CV adaptado, carta de interés, notas de entrevista
- Perfil con CV base que pre-rellena el CV adaptado
- Layout responsive con sidebar colapsable y hamburger menu en móvil

## Inicio rápido

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

> **¿Error tipo `NODE_MODULE_VERSION` o "was compiled against a different Node.js version"?** Es `better-sqlite3` —
> tiene un binario nativo atado a la versión exacta de Node con la que se instaló. Se arregla con:
> ```bash
> npm rebuild better-sqlite3
> npm install
> ```

## Comandos

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run test     # Tests con Vitest
npm run lint     # ESLint
```

## Estructura principal

```
src/
  app/
    page.tsx              ← Dashboard
    jobs/                 ← Lista y detalle
    profile/              ← Perfil y CV base
    api/                  ← API Routes
  components/
    AppShell.tsx           ← Layout shell (estado del sidebar)
    Sidebar.tsx            ← Navegación lateral responsive
    MobileHeader.tsx        ← Top bar con hamburger (solo móvil)
    JobCard.tsx
    JobForm.tsx
    JobDetailTabs.tsx
    JobsFilter.tsx
    ProfileForm.tsx
  lib/
    db.ts                 ← Queries (solo servidor)
    validations.ts        ← Zod schemas
drizzle/
  schema.ts               ← Tablas: jobs, profile
```
