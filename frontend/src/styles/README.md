# Guía de Importación de Estilos por Página

## Configuración del Sistema de Diseño

El sistema de diseño profesional ha sido implementado con los siguientes archivos:

### 📁 Archivo Principal
- `src/styles/globals.css` - Sistema de diseño global con variables CSS, componentes base y utilidades

### 📁 Archivos CSS por Página
- `src/pages/Dashboard.css` - Estilos específicos para el Dashboard
- `src/pages/Login.css` - Estilos específicos para Login
- `src/pages/Register.css` - Estilos específicos para Register
- `src/pages/Players.css` - Estilos específicos para Players
- `src/pages/Stats.css` - Estilos específicos para Stats
- `src/pages/Tactics.css` - Estilos específicos para Tactics
- `src/pages/Profile.css` - Estilos específicos para Profile
- `src/pages/NotFound.css` - Estilos específicos para 404

## Instrucciones de Implementación

### 1. Importar en cada componente React

En cada archivo `.tsx` de página, agrega la importación correspondiente:

```typescript
// Dashboard.tsx
import './Dashboard.css';

// Login.tsx
import './Login.css';

// Register.tsx
import './Register.css';

// Players.tsx
import './Players.css';

// Stats.tsx
import './Stats.css';

// Tactics.tsx
import './Tactics.css';

// Profile.tsx
import './Profile.css';

// NotFound.tsx
import './NotFound.css';
```

### 2. Estructura HTML recomendada

Cada página debe usar la siguiente estructura base:

```jsx
// Para páginas completas
<div className="page-container">
  <div className="content-wrapper">
    <h1>Título de la Página</h1>
    
    <div className="section-container">
      {/* Contenido de la sección */}
    </div>
  </div>
</div>

// Para Login/Register (páginas especiales)
<div className="login-container">
  {/* Contenido específico */}
</div>
```

### 3. Clases CSS disponibles

#### Contenedores:
- `.page-container` - Contenedor principal de página
- `.section-container` - Contenedor de sección con efectos hover
- `.card` - Tarjeta básica
- `.dashboard-card` - Tarjeta específica del dashboard

#### Botones:
- `.btn` - Botón base
- `.btn-primary` - Botón primario
- `.btn-secondary` - Botón secundario
- `.btn-danger` - Botón destructivo
- `.btn-sm`, `.btn-lg` - Tamaños de botón

#### Formularios:
- `.form-group` - Grupo de formulario
- `.form-label` - Etiqueta de formulario
- `.form-input` - Input de formulario
- `.form-textarea` - Textarea de formulario
- `.form-select` - Select de formulario

#### Grids y Layouts:
- `.grid` - Grid básico
- `.grid-cols-1`, `.grid-cols-2`, `.grid-cols-3`, `.grid-cols-4` - Columnas de grid
- `.grid-responsive` - Grid responsivo
- `.flex`, `.flex-col` - Flexbox

#### Utilidades:
- `.text-center`, `.text-left`, `.text-right` - Alineación de texto
- `.font-bold`, `.font-semibold`, `.font-medium` - Pesos de fuente
- `.badge`, `.badge-primary`, `.badge-success`, `.badge-warning`, `.badge-danger` - Badges
- `.loading-skeleton` - Animación de carga
- `.tooltip` - Tooltip simple

### 4. Características del Sistema de Diseño

#### ✨ Variables CSS Centralizadas
- Colores consistentes con gradientes modernos
- Espaciados matemáticamente precisos
- Tipografía jerarquizada
- Sombras y efectos profesionales

#### ✨ Micro-interacciones
- Hover effects con transformaciones suaves
- Transiciones fluidas en todos los elementos
- Estados de foco mejorados para accesibilidad
- Feedback visual inmediato

#### ✨ Responsividad Completa
- Breakpoints optimizados (1024px, 768px, 480px)
- Grid systems que se adaptan automáticamente
- Componentes flexibles para móviles

#### ✨ Accesibilidad
- Estados de foco visibles
- Contrastes optimizados
- Navegación por teclado mejorada

### 5. Paleta de Colores

```css
/* Colores principales */
--color-primary: #0f172a;        /* Azul oscuro elegante */
--color-accent: #3b82f6;         /* Azul moderno */
--color-success: #10b981;        /* Verde elegante */
--color-warning: #f59e0b;        /* Amarillo profesional */
--color-danger: #ef4444;         /* Rojo moderno */

/* Fondos */
--bg-primary: #ffffff;           /* Blanco puro */
--bg-secondary: #f8fafc;         /* Gris muy claro */
--bg-tertiary: #f1f5f9;          /* Gris claro */

/* Texto */
--text-primary: #0f172a;         /* Texto principal */
--text-secondary: #475569;       /* Texto secundario */
--text-muted: #64748b;           /* Texto silenciado */
```

### 6. Tipografía

```css
/* Familias de fuente */
--font-family-primary: 'Inter', sans-serif;     /* Texto general */
--font-family-display: 'Poppins', sans-serif;   /* Títulos */

/* Tamaños */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
```

### 7. Ejemplos de Uso

#### Tarjeta de jugador:
```jsx
<div className="card">
  <div className="card-header">
    <h3 className="card-title">Nombre del Jugador</h3>
  </div>
  <div className="card-content">
    <p>Información del jugador...</p>
  </div>
</div>
```

#### Formulario:
```jsx
<div className="form-group">
  <label className="form-label">Email</label>
  <input type="email" className="form-input" />
</div>
```

#### Grid de estadísticas:
```jsx
<div className="grid grid-cols-3 gap-6">
  <div className="card">
    <div className="stat-number">25</div>
    <div className="stat-label">Partidos</div>
  </div>
  {/* Más cards... */}
</div>
```

## Notas Importantes

1. **Consistencia**: Usa siempre las variables CSS definidas
2. **Responsividad**: Testea en diferentes tamaños de pantalla
3. **Accesibilidad**: Mantén los estados de foco y contrastes
4. **Performance**: Las transiciones están optimizadas para 60fps
5. **Mantenimiento**: Centraliza cambios en `globals.css`

El sistema está diseñado para ser completamente profesional y listo para producción.
