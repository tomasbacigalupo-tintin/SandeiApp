# Diseño UX/UI de SandeiApp

Este documento resume las pautas de diseño centrado en el usuario para la versión 1.0 de **SandeiApp**.

## Personas objetivo

1. **Entrenador amateur**
   - Necesita organizar jugadores, gestionar formaciones y registrar calificaciones.
   - Busca una terminología sencilla y flujos directos para crear partidos y evaluar rendimientos.
2. **Analista de club**
   - Requiere exportar datos y realizar análisis más profundos con ayuda del módulo IA.
   - Maneja un volumen mayor de información y utiliza la aplicación para tomar decisiones tácticas.
3. **Jugador**
   - Consulta su propio rendimiento y la retroalimentación del entrenador.
   - Necesita vistas simples orientadas a estadísticas personales.

El flujo y la terminología de la app se centran principalmente en el **entrenador amateur**, ofreciendo opciones adicionales para analistas sin sobrecargar la interfaz de los jugadores.

## Pruebas de usabilidad

Antes de implementar las pantallas definitivas se propondrá un prototipo en herramientas como **Figma** o **InVision**. Se realizarán al menos dos rondas de validación:

1. **Boceto inicial** – Navegación básica y estructura de menús.
2. **Prototipo interactivo** – Flujo completo de registro de jugador, creación de formación y consulta de estadísticas.

Estos prototipos se evaluarán con usuarios reales (entrenadores y jugadores) o testers designados para detectar puntos de fricción y ajustar textos o interacción.

## Design system básico

A continuación se definen los componentes comunes de la interfaz. Cada uno indica tamaño, color principal, tipografía y estados disponibles.

### Botón primario

- **Tamaño:** altura 40px, padding horizontal 16px.
- **Color:** fondo `#2563eb` (azul) con texto blanco.
- **Tipografía:** Inter, 14px, semibold.
- **Estados:**
  - Activo: color de fondo `#2563eb`.
  - Inactivo: opacidad 80%.
  - Deshabilitado: fondo gris `#cbd5e1`, texto gris `#94a3b8`.
  - Loading: spinner pequeño a la izquierda del texto.

### Campo de texto

- **Tamaño:** ancho 100%, altura 36px, padding 8px.
- **Color de borde:** gris `#d1d5db`.
- **Tipografía:** Inter, 14px.
- **Estados:**
  - Activo: borde `#2563eb`.
  - Inactivo: borde gris.
  - Deshabilitado: fondo gris claro `#f1f5f9`.
  - Loading: indicador de progreso al final del campo (si aplica).

### Tarjeta de jugador

- **Tamaño:** 280px × 160px.
- **Color:** fondo blanco, borde `#e2e8f0`.
- **Tipografía:** Inter, 16px para el nombre, 14px para detalles.
- **Estados:**
  - Activa: sombra suave `rgba(0,0,0,0.05)` al pasar el cursor.
  - Inactiva/deshabilitada: opacidad 60%.

### Etiquetas (tags)

- **Tamaño:** altura 24px, padding horizontal 8px.
- **Color:** fondo `#f1f5f9`, texto `#334155`.
- **Tipografía:** Inter, 12px.
- **Estados:** activo (color por defecto) / deshabilitado (opacidad 70%).

Con estos lineamientos se garantiza consistencia en toda la interfaz y se facilita la colaboración entre desarrollo y diseño.
