# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es esto

CV/portafolio de una sola página (Jorge Gutiérrez), en HTML/CSS/JS puro (vanilla), sin build ni dependencias. Tres archivos principales:

- `index.html` — todo el contenido, organizado en `<section class="card">` (Perfil, Habilidades, Experiencia, Formación, Idiomas, Referencias) dentro de un `<aside class="sidebar">` (nav fija) + `<main>`.
- `style.css` — tema claro con acento azul. Variables de color/tipografía centralizadas en `:root` al inicio del archivo; cambiar el tema pasa por ahí. `--card` es translúcido (`rgba(255,255,255,.72)` + `backdrop-filter`) para que se vea la animación de fondo; `--card-solid` es el blanco opaco para botones y estados hover.
- `script.js` — sin frameworks. Cuatro comportamientos independientes: efecto de tipeo del rol en el sidebar, `IntersectionObserver` para fade-in de cards al hacer scroll (y re-tipeo del título de cada card), `IntersectionObserver` para resaltar el link activo del nav, y toggle del sidebar móvil (botón hamburguesa + backdrop).

No hay `package.json`, bundler, linter ni test runner.

## Cómo trabajar en este repo

- Para ver cambios, abrir `index.html` directamente en el navegador (o servir la carpeta con cualquier servidor estático). No hay paso de compilación.
- Los iconos de habilidades (Python, SQL, OpenAI, etc.) son **SVG inline** dentro de `index.html`, no archivos ni CDN. Esto es obligatorio: el CSP (`img-src 'self' data:`) bloquea imágenes externas, así que `cdn.simpleicons.org` no funcionaría. Para añadir un icono, pega su `<path>` en un `<svg class="skill-icon" viewBox="0 0 24 24" fill="currentColor">`.
- El avatar (`imagenes/fotohv.jpg`) tiene un fallback con iniciales (`JG`) gestionado en `script.js` (evento `error`, sin `onerror` inline) si la imagen falta.
- El breakpoint móvil es `900px` (media query al final de `style.css`); ahí el sidebar pasa a overlay con backdrop, y `--card` sube a 0.88 con blur reducido (menos coste de GPU).
- Hay un bloque `@media (prefers-reduced-motion: reduce)` que apaga los blobs y **fuerza `.card { opacity: 1 }`** — sin eso las cards quedarían invisibles, porque arrancan en `opacity: 0` y se revelan con JS.
- La carpeta `iconos/` fue eliminada del repo — los iconos son SVG inline, no reintroducir esos archivos.
