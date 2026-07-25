---
name: review-pr
description: Checklist de revisión de Pull Requests para el job-tracker
---

# Skill: Review PR — job-tracker

Cuando te pida revisar un PR o un diff, usa este checklist. Señala cada punto que falle con el formato `[TIPO] archivo:línea — descripción`.

## Checklist de revisión

### Seguridad (prioridad alta — bloquea el merge)
- [ ] No hay credenciales, tokens ni secrets hardcodeados
- [ ] Todo input de usuario pasa por Zod antes de llegar a la DB
- [ ] No hay SQL raw (template literals con queries)
- [ ] Los archivos de servidor (`db.ts`, `schema.ts`) no se importan en Client Components
- [ ] Los endpoints de API retornan 400/404/500 apropiados — no exponen stack traces

### Corrección
- [ ] Los tipos TypeScript son correctos — sin `any`, sin `as` innecesarios
- [ ] Los casos de error están manejados (null checks, try/catch en API routes)
- [ ] Los estados de Zod enum son los definidos: `wishlist | applied | interviewing | offer | rejected`
- [ ] Las funciones de `src/lib/db.ts` devuelven los tipos correctos de `@/types`

### Convenciones del proyecto
- [ ] Componentes en PascalCase dentro de `src/components/`
- [ ] API routes como `route.ts` dentro de `src/app/api/[recurso]/`
- [ ] Client Components tienen `'use client'` — Server Components no lo tienen
- [ ] Sin `console.log` (usar solo en dev y con comentario explícito)

### Tests
- [ ] Las funciones nuevas en `src/lib/` tienen test en Vitest
- [ ] Los tests cubren: happy path, entrada vacía, entrada inválida
- [ ] `npm run test -- --run` pasa sin errores

### Calidad
- [ ] Los componentes no mezclan lógica de negocio con UI (la lógica va en `src/lib/`)
- [ ] Los props de los componentes tienen tipos explícitos (no `any`)
- [ ] No hay código muerto ni imports no usados

## Lo que no bloquea el merge (solo `[SUGGEST]`)

- Refactorings de mejora sin impacto funcional
- Agregar más tests de los mínimos requeridos
- Mejoras de UX que no estaban en el scope del PR
