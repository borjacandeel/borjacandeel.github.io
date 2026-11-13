# Borja Candel — Portfolio Web Profesional

Bienvenido al repositorio de mi portfolio web personal. Este proyecto ha sido diseñado desde cero para reflejar mi perfil técnico como Administrador de Sistemas y Redes (ASIR/SMR), con una estética inspirada en las Human Interface Guidelines de Apple (tipografía de sistema, grandes titulares, tarjetas redondeadas y un único menú de cristal flotante) y un rendimiento técnico impecable.

## 🚀 Tecnologías

El proyecto ha sido desarrollado utilizando un stack tecnológico limpio y sin dependencias externas para garantizar el máximo rendimiento y control:

- **HTML5 Semiaśntico**: Estructura limpia y accesible.
- **CSS3 Vanilla**: Diseño estilo Apple (SF Pro / Inter como alternativa), colores del sistema, Liquid Glass solo en la barra de navegación, Variables CSS, Grid/Flexbox y animaciones discretas.
- **JavaScript Vanilla (ES6+)**: Lógica liviana para revelado al hacer scroll, contadores, acordeones, visor de capturas y copia de email.
- **Cero frameworks**: Sin dependencias de React, Vue, Tailwind, ni librerías adicionales.

## ✨ Características Principales

*   🌓 **Modo claro / oscuro**: sigue la apariencia del sistema y tiene un botón para cambiarlo (se recuerda en `localStorage`), con transición circular.
*   🎞️ **Scroll cinematográfico**: desplazamiento suave (Lenis, incluido en `assets/vendor`), inicio fijado en pantalla donde el texto se desvanece, el logo BC crece y aparece la Terminal, y frases gigantes que entran y salen con zoom.
*   🧲 **Scroll con ajuste**: un pequeño giro de rueda lleva al siguiente apartado o fotograma (en ordenador con Lenis; en móvil con `scroll-snap` nativo), sin bloquear la lectura de las secciones largas.
*   ✨ **Más animación**: títulos que suben palabra a palabra, ventanas que se inclinan al entrar, banda de logos que acelera con el scroll, luz que sigue al ratón en las ventanas y logo final que se rellena al llegar al pie.
*   🖱️ **Cursor fantasma**: al bajar, un cursor con la etiqueta «Borja» recorre la página y pulsa, señala o selecciona lo importante (como cuando una IA usa el ordenador), con movimiento de muelle y gotas de cristal al hacer clic.
*   💧 **Liquid Glass**: la barra y el botón de subir tienen brillo especular y un borde de luz que se orienta hacia el ratón; los botones se deforman como gotas al pulsarlos.
*   🔷 **Logos en SVG**: logo BC vectorizado (`assets/logo-bc.svg`, cambia a blanco o negro según el tema), favicon y la «m» de Markha redibujada en SVG (siempre azul).
*   🚴🎧 **Strava y SoundCloud**: ventanas con avatar, ruta que se dibuja al hacer scroll y el reproductor oficial de SoundCloud, que anima la ventana mientras suena.
*   💧 **Liquid Glass con moderación**: el material de cristal se usa solo en la capa funcional flotante (barra de navegación, botón de subir y avisos); el contenido va sobre superficies opacas. Respeta *Reducir transparencia*.
*   🧭 **Menús estilo Apple**: la barra de cristal se despliega en menús (Habilidades, Experiencia, Proyectos, Contacto) con el resto de la página desenfocada; en móvil la barra se convierte en un menú a pantalla completa con animación en cascada.
*   🎬 **Transiciones de scroll**: el hero se aleja y desenfoca al bajar, el texto de «Sobre mí» se ilumina palabra a palabra y la experiencia en Markha se cuenta en una ventana macOS fija que cambia de icono, logos y registro de terminal según avanzas.
*   🌊 **Movimiento físico**: muelles críticamente amortiguados (sin rebote) para todas las transiciones, capturas que se abren desde su miniatura y vuelven a ella, arrastre 1:1 con velocidad y resistencia en los bordes, y respuesta inmediata al pulsar.
*   📜 **Scroll animado discreto**: los elementos aparecen suavemente con `IntersectionObserver`; todo el movimiento se desactiva con *Reducir movimiento*.
*   📱 **100% responsivo**: adaptación a móviles, tablets y monitores grandes, sin scroll horizontal.
*   🧑 **Retrato de estudio**: foto recortada (`assets/borja.webp`) sobre un fondo de estudio que se adapta al modo claro u oscuro.
*   🪟 **Ventanas macOS**: habilidades, proyectos y experiencia se presentan como ventanas con los botones rojo, amarillo y verde; el verde amplía cada proyecto a ancho completo.
*   🏷️ **Logos de tecnologías**: banda animada con los logos (Simple Icons, CC0) que se colorean al pasar el ratón, y logos en las etiquetas de cada ventana.

## 🗂 Estructura de Secciones

El portfolio está divivido narrativamente para presentar rápidamente mi información profesional:

1.  **Hero Section**: Nombre en gran tamaño, titular, botones directos y una ventana de Terminal que se escribe sola.
2.  **Sobre Mí y Estadísticas**: Un breve resumen de mi vocación técnica junto a un contador numérico dinámico de estadísticas clave.
3.  **Habilidades Técnicas (*Skills*)**: Clasificación visual en tarjetas de Sistemas Operativos, Redes, Programación y Ciberseguridad/Virtualización.
4.  **Experiencia Profesional**: Las 11 áreas de trabajo en Markha (Sueca), contadas paso a paso con una ventana macOS que acompaña el scroll.
5.  **Educación**: Titulaciones en curso y finalizadas en tarjetas.
6.  **Proyectos**: monitorización de infraestructura, agente local de auditoría con IA, pipeline de auditoría web y homelab, como ventanas ampliables.
7.  **Más Allá del Código (Intereses)**: Muestra mi perfil polivalente a través de la pasión por el ciclismo y la producción musical.
8.  **Contacto**: Accesos directos para enviar email, llamarme o descargar el currículum.

---

Desarrollado con dedicación por **Borja Candel**.
[Conecta conmigo vía Email](mailto:borjacs07@gmail.com)
