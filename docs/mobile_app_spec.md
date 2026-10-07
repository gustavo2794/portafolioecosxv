
# Especificaciones para la Aplicación Móvil: Compañía de Danza Ecos del Sur

## 1. Resumen General

**Propósito de la App:**
La aplicación será una versión móvil del sitio web de "Compañía de Danza Ecos del Sur". Su objetivo principal es servir como un portafolio digital para mostrar el trabajo de la compañía, presentar sus paquetes de servicios para fiestas de XV Años y facilitar que los clientes potenciales soliciten cotizaciones a través de WhatsApp.

**Público Objetivo:**
Principalmente padres de familia y quinceañeras que buscan servicios de coreografía para sus eventos.

**Tono y Estilo:**
Elegante, profesional, moderno y vibrante. La estética debe reflejar la pasión y la magia de una celebración de XV Años.

---

## 2. Identidad de Marca y Estilo Visual

### 2.1. Logos
- **Logo Completo:** `https://res.cloudinary.com/drylg7prb/image/upload/v1761183135/LOGO_ECOS_2024_cldy7v.png`
- **Icono (Letra 'E'):** `https://res.cloudinary.com/drylg7prb/image/upload/v1761183133/Letra_E_Ecos_vikchj.png`

### 2.2. Paleta de Colores (Tema Oscuro)
La aplicación debe usar un tema oscuro predominante para transmitir elegancia.
- **Fondo Principal:** Azul marino muy oscuro / casi negro (`hsl(222 47% 11%)`).
- **Color Primario (Acento principal):** Dorado brillante (`hsl(45 80% 60%)`). Se usa para botones, títulos importantes y elementos destacados.
- **Color de Acento Secundario:** Rojo vino profundo (`hsl(345 70% 45%)`).
- **Texto Principal:** Blanco / Gris claro (`hsl(220 25% 95%)`).
- **Texto Secundario (Silenciado):** Gris (`hsl(220 25% 65%)`).

### 2.3. Tipografía
- **Títulos y Encabezados (Headline):** `Playfair Display` (fuente serif, elegante y audaz).
- **Cuerpo de Texto (Body):** `PT Sans` (fuente sans-serif, limpia y legible).

---

## 3. Estructura de la Aplicación y Pantallas

La aplicación se compondrá de una navegación principal y varias pantallas clave.

### 3.1. Navegación
- **Menú Lateral (Hamburguesa):** La navegación principal debe estar oculta en un menú lateral deslizable desde la izquierda. El icono del menú (tres líneas horizontales) debe estar siempre visible en la esquina superior izquierda de la barra de navegación.
- **Opciones del Menú:**
  - Inicio
  - Proyectos
  - Paquetes
  - Galería
- **Barra de Navegación Superior (Header):**
  - **Izquierda:** Icono de menú hamburguesa.
  - **Centro:** Puede estar vacío o contener el icono de la letra 'E'.
  - **Derecha:** Un botón destacado con el texto "Cotiza Aquí" que lleve directamente a la pantalla de "Paquetes".

### 3.2. Pantalla: Inicio
- **Fondo:** Una imagen de alta calidad de una quinceañera (imagen `hero-background`). Debe tener una superposición oscura para asegurar la legibilidad del texto.
- **Contenido Central:**
  1.  El logo completo de "Ecos del Sur".
  2.  Título principal: "El Baile de Tus Sueños" (usando la fuente Playfair Display).
  3.  Subtítulo: "Ecos Del Sur trae pasión, elegancia y coreografías inolvidables a tu celebración de XV Años." (usando la fuente PT Sans).
  4.  Botón de Acción Principal (CTA): "Explora Nuestro Portafolio", que dirige a la pantalla de "Proyectos".

### 3.3. Pantalla: Proyectos (Portafolio de Videos)
- **Diseño:** Una cuadrícula (grid) de 2 columnas.
- **Contenido:**
  - Título de la pantalla: "Nuestros Eventos Pasados".
  - Subtítulo descriptivo.
  - Cada elemento de la cuadrícula es una tarjeta de video que contiene:
    - Una imagen de miniatura (thumbnail).
    - Un título para el video (ej. "OPENING", "Vals Principal").
    - Un icono de "Play" superpuesto en la miniatura para indicar que es un video.
- **Funcionalidad:**
  - Al tocar una tarjeta de video, se debe abrir un reproductor de video en pantalla completa (o en un modal/dialog) que reproduzca automáticamente el video de YouTube correspondiente.

### 3.4. Pantalla: Paquetes (Precios)
- **Diseño:** Una lista vertical o cuadrícula de tarjetas, cada una representando un paquete.
- **Contenido:**
  - Título de la pantalla: "Nuestros Paquetes".
  - Subtítulo descriptivo.
  - **Tarjeta de Paquete Estándar:**
    - Nombre del paquete (ej. "Paquete Básico", "Paquete Oro").
    - Lista de características incluidas en el paquete, cada una con un icono de check (✓) al lado.
    - Un botón "Solicitar".
  - **Tarjeta Especial: "Crea tu Propio Paquete"**:
    - Un diseño visualmente distinto (con gradiente o borde dorado).
    - Título: "Crea tu Propio Paquete".
    - Icono grande de `PackagePlus` (un paquete con un signo de más).
    - Descripción que invita al usuario a personalizar su paquete.
    - Un botón "Comenzar a Construir".
- **Funcionalidad:**
  - Tocar el botón "Solicitar" en cualquier paquete estándar abre el flujo de "Solicitud de Cotización" (ver sección 4.1).
  - Tocar el botón "Comenzar a Construir" abre el flujo de "Constructor de Paquete Personalizado" (ver sección 4.2).

### 3.5. Pantalla: Galería (Fotos)
- **Diseño:** Una cuadrícula de mampostería (masonry grid), donde las imágenes de diferentes alturas se acomodan de forma compacta (similar a Pinterest).
- **Contenido:**
  - Título de la pantalla: "Nuestra Galería".
  - Subtítulo descriptivo.
  - La cuadrícula de imágenes.
- **Funcionalidad:**
  - Al tocar una imagen, esta se abre en un visor de pantalla completa (lightbox/dialog).
  - Dentro del visor, el usuario debe poder deslizar (swipe) a la izquierda y derecha para navegar a la imagen anterior o siguiente sin tener que cerrar el visor. Deben existir también botones de flecha a los lados.

---

## 4. Flujos Interactivos Clave

### 4.1. Flujo: Solicitud de Cotización (para paquetes estándar)
1.  **Disparador:** El usuario toca el botón "Solicitar" en una tarjeta de paquete.
2.  **Acción:** Se abre un pequeño modal/dialog que solicita:
    - **Nombre del usuario:** Campo de texto.
    - **Fecha del Evento (Opcional):** Un selector de fecha que no permita elegir fechas pasadas.
3.  **Finalización:** Al tocar el botón "Enviar por WhatsApp", la aplicación debe:
    - Construir un mensaje pre-llenado. Ejemplo: "Hola, mi nombre es [Nombre del Usuario]. Estoy interesado(a) en el [Nombre del Paquete]. La fecha de mi evento es el [Fecha del Evento]. ¿Podrían darme más información?".
    - Abrir la aplicación de WhatsApp con este mensaje y el número de la compañía (`525528098448`) listos para ser enviado.

### 4.2. Flujo: Constructor de Paquete Personalizado (Global)
Este es el flujo más complejo y es central para la captura de leads.
1.  **Disparadores:**
    - Tocar el botón "Comenzar a Construir" en la pantalla de Paquetes.
    - Tocar el **Botón Flotante de WhatsApp** que debe estar visible en todas las pantallas, en la esquina inferior derecha.
2.  **Acción:** Se abre un modal/dialog grande que contiene:
    - **Título:** "Arma tu Paquete Personalizado".
    - **Columnas de selección (o una lista desplazable):**
      - **Componentes del Evento:** Una lista de checkboxes para que el usuario seleccione los servicios que desea.
        - `[ ] Opening`
        - `[ ] Vals entrada`
        - `[ ] Vals protocolos (juguete, etc.)`
        - `[ ] Vals principal`
        - `[ ] Vals familiar`
        - `[ ] Mix moderno 1`
        - `[ ] Mix moderno 2`
        - `[ ] Vestuario para bailarines y quinceañera`
        - `[ ] Pirotecnia`
      - **Número de Bailarines:** Un selector/dropdown para elegir de 0 a 8 bailarines.
    - **Sección de Datos del Usuario:**
      - **Tu Nombre:** Campo de texto.
      - **Fecha del Evento (Opcional):** Selector de fecha.
    - **Peticiones Especiales:** Un campo de texto multilínea grande para que el usuario escriba cualquier detalle adicional.
3.  **Finalización:** Al tocar el botón "Solicitar Cotización por WhatsApp":
    - La aplicación debe recolectar todas las opciones seleccionadas (checkboxes, número de bailarines), el nombre, la fecha y las peticiones especiales.
    - Construir un mensaje detallado y formateado.
    - Abrir WhatsApp con este mensaje y el número de la compañía.

---

## 5. Contenido y Datos

Todo el contenido (títulos, descripciones, características de paquetes, IDs de videos de YouTube, URLs de imágenes) está actualmente "hardcodeado" (escrito directamente en el código fuente de la web). Para la app móvil, se puede seguir la misma estrategia inicialmente. No se requiere un CMS o base de datos en esta primera versión.

- **Imágenes y Videos:** Las URLs de las imágenes de la galería, miniaturas de proyectos y videos de YouTube están definidas en `src/lib/placeholder-images.json` y `src/components/sections/project-showcase.tsx`.
- **Detalles de Paquetes:** Las características de cada paquete están definidas en `src/components/sections/pricing.tsx`.

