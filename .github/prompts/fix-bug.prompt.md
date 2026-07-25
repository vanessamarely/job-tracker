---
name: fix-bug
description: Plantilla para describir y corregir un bug en el job-tracker
---

Hay un bug en el job-tracker que necesito corregir:

---

## Descripción del problema

**¿Qué comportamiento se observa?**
[DESCRIBE LO QUE ESTÁ PASANDO]

**¿Qué comportamiento se espera?**
[DESCRIBE LO QUE DEBERÍA PASAR]

**¿En qué condiciones ocurre?** (pasos para reproducir)
1. [PASO 1]
2. [PASO 2]
3. [RESULTADO INCORRECTO]

## Contexto técnico

**Archivo(s) probablemente involucrados:**
- [ARCHIVO 1]
- [ARCHIVO 2]

**Error en consola o terminal (si existe):**
```
[PEGA EL STACK TRACE AQUÍ]
```

## Stack del proyecto

- Next.js 15 (App Router) + React 19 + TypeScript
- Drizzle ORM + better-sqlite3 · Zod v4 · Tailwind CSS v4

## Criterios de éxito del fix

- [ ] El comportamiento observado ya no ocurre
- [ ] El comportamiento esperado funciona correctamente
- [ ] Los tests existentes siguen pasando: `npm run test -- --run`
- [ ] No se introdujeron cambios no relacionados con el bug
