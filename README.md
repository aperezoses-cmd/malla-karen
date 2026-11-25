# Mi malla de Derecho · UAutónoma 2025

App web local para anotar calificaciones, comentarios y seguir el avance de la malla curricular de Derecho 2025 de la Universidad Autónoma de Chile.

## Cómo usarla

1. Abre `index.html` en tu navegador (doble clic). No necesitas servidor ni internet.
2. Para cada ramo puedes:
   - Ingresar una nota entre 1,0 y 7,0.
   - Cambiar el estado manualmente: Pendiente, Cursando, Aprobado o Reprobado.
   - Escribir una anotación opcional.
3. Si la nota es igual o superior a la nota mínima (4,0 por defecto), el ramo pasa automáticamente a **Aprobado**. Si es menor, queda como **Reprobado**.
4. El progreso se guarda automáticamente en el `localStorage` del navegador.

## Funciones

- Resumen general: aprobados, cursando, pendientes, reprobados y promedio con notas.
- Barra de avance global y barra por semestre.
- Búsqueda por nombre y filtros por estado.
- Nota mínima configurable.
- Exportar e importar el progreso como archivo JSON.
- Reiniciar todo el progreso.

## Datos

La malla fue extraída del PDF oficial:

https://admision.uautonoma.cl/content/uploads/2025/01/Malla-Derecho-2025.pdf

Incluye 10 semestres y 55 asignaturas. La universidad advierte que la información es referencial y puede estar sujeta a modificaciones.

## Versión personalizada de Karen

Abre `karen.html` para usar la versión de Karen Cifuentes:

- Muestra su nombre y "4° año · 2027" en la cabecera.
- Arranca con los semestres 1 a 6 marcados como aprobados y los semestres 7 y 8 como cursando.
- Guarda su progreso en una clave propia de `localStorage`, separada de la versión genérica.
- El botón **Reiniciar** vuelve a esa base de 4° año, no a una malla vacía.

Puedes ajustar los datos de `perfil-karen.js` si cambia el año o los semestres ya aprobados.

## Archivos

- `index.html`: estructura de la interfaz genérica.
- `karen.html`: versión personalizada para Karen.
- `perfil-karen.js`: configuración del perfil de Karen.
- `styles.css`: estilos y diseño responsive.
- `data.js`: malla curricular, competencias y datos de cada ramo.
- `app.js`: lógica de notas, estados, filtros y persistencia.
