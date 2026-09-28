# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es esto

CV/portafolio de una sola página (Jorge Gutiérrez), en HTML/CSS/JS puro (vanilla), sin build ni dependencias. Tres archivos principales:

- `index.html` — todo el contenido, organizado en `<section class="card">` (Perfil, Habilidades, Experiencia, Formación, Idiomas, Referencias) dentro de un `<aside class="sidebar">` (nav fija) + `<main>`.
- `style.css` — tema "terminal" oscuro. Variables de color/tipografía centralizadas en `:root` al inicio del archivo; cambiar el tema pasa por ahí.
- `script.js` — sin frameworks. Cuatro comportamientos independientes: efecto de tipeo del rol en el sidebar, `IntersectionObserver` para fade-in de cards al hacer scroll (y re-tipeo del título de cada card), `IntersectionObserver` para resaltar el link activo del nav, y toggle del sidebar móvil (botón hamburguesa + backdrop).

No hay `package.json`, bundler, linter ni test runner.

## Cómo trabajar en este repo

- Para ver cambios, abrir `index.html` directamente en el navegador (o servir la carpeta con cualquier servidor estático). No hay paso de compilación.
- Los iconos de habilidades (Python, SQL, Linux, etc.) se cargan por CDN (`cdn.simpleicons.org`), no como archivos locales — si un icono no carga, el `onerror` inline lo oculta en vez de romper el layout.
- El avatar (`imagenes/fotohv.jpg`) tiene un fallback con iniciales (`JG`) vía `onerror` si la imagen falta.
- El breakpoint móvil es `900px` (media query al final de `style.css`); ahí el sidebar pasa a overlay con backdrop.
- La carpeta `iconos/` fue eliminada del repo (ver `git status`) — los iconos ahora se sirven desde el CDN, no reintroducir esos archivos salvo que se decida volver a íconos locales.
