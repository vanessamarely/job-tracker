# Spec: Ordenar jobs por prioridad

## Contexto

La página `/jobs` (`src/app/jobs/page.tsx`) muestra las postulaciones en el orden en que fueron creadas. Cada
job tiene un campo `priority` (`high | medium | low`, ver `drizzle/schema.ts`), pero hoy no se usa para ordenar
nada — solo se muestra como badge en `JobCard`.

## Objetivo

Agregar un selector de orden en la página `/jobs` que permita ordenar la lista por prioridad
(`high → medium → low`), además de mantener el orden por fecha que ya existe hoy como opción.

## Restricciones

- El ordenamiento se hace en el cliente sobre los datos que ya trae la página — no agregar parámetros nuevos a
  la API `GET /api/jobs`
- No modificar el schema de la base de datos
- No instalar dependencias nuevas
- El selector va junto al filtro de estado que ya existe en `JobsFilter`
- Mantener el comportamiento actual (orden por fecha) como opción por defecto

## Criterios de aceptación

- [ ] Existe un control para elegir entre "Más recientes" (default, comportamiento actual) y "Por prioridad"
- [ ] Al elegir "Por prioridad", el orden es `high`, luego `medium`, luego `low`
- [ ] Cambiar el filtro de estado no resetea el criterio de orden elegido
- [ ] Los tests existentes siguen pasando: `npm run test -- --run`
- [ ] El build compila sin errores: `npm run build`
