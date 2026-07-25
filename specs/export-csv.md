# Spec: Exportar jobs a CSV

## Contexto

El job-tracker (`src/app/jobs/page.tsx`) muestra un listado de postulaciones con los campos: empresa, cargo, estado, salary, prioridad y fecha de creación. Los usuarios necesitan exportar sus datos para análisis externo en Excel o Google Sheets.

La lista ya existe en el componente `JobsFilter` + la grid de `JobCard`. Los datos se obtienen de la API `GET /api/jobs`.

## Objetivo

Agregar un botón "Exportar CSV" en la página `/jobs` que descarga un archivo CSV con las postulaciones actualmente visibles (respetando el filtro de estado activo).

## Restricciones

- El CSV se genera completamente en el cliente (componente React) usando la API `Blob` nativa del browser — sin endpoint de servidor adicional
- El archivo descargado debe llamarse `jobs-YYYY-MM-DD.csv` con la fecha actual en formato ISO
- **No modificar** el schema de la base de datos
- **No instalar** nuevas dependencias (usar solo APIs nativas del browser)
- El botón de exportar se coloca junto al botón "Nueva postulación" en el header de la página
- Los datos a exportar son los mismos que ya están renderizados en pantalla (no una nueva llamada a la API)

## Formato del CSV

```csv
empresa,cargo,estado,salario_usd,prioridad,fecha_postulacion
Google,Senior Frontend Engineer,applied,120000,high,2026-07-01
Platzi,Developer Advocate,interviewing,,medium,2026-06-15
```

Headers siempre en minúsculas y en inglés. Si `salary` es null, la columna va vacía (no "null" ni "N/A").

## Criterios de éxito

- [ ] El botón "Exportar CSV" aparece en el header de la página `/jobs`
- [ ] Al hacer clic, el browser descarga automáticamente un archivo `.csv`
- [ ] El nombre del archivo tiene el formato `jobs-YYYY-MM-DD.csv`
- [ ] El archivo incluye los headers: `empresa,cargo,estado,salario_usd,prioridad,fecha_postulacion`
- [ ] Cada fila corresponde a un job de los actualmente visibles (con el filtro de estado aplicado)
- [ ] Si `salary` es null, la celda queda vacía (no como string "null")
- [ ] Las comas en los valores de texto van escapadas entre comillas (`"Google, Inc."`)
- [ ] Funciona en Chrome, Firefox y Safari modernos

## Ejemplo de uso en el agente

```
Implementa la feature descrita en esta spec: #file:specs/export-csv.md
```
