# Paseo Artesanal Mármol

Sitio web oficial del Paseo Artesanal Mármol, una feria autogestiva de producción artesanal ubicada en José Mármol, Almirante Brown, Buenos Aires.

## Sobre el proyecto

Este es un sitio web estático de una sola página. Presenta la feria, su identidad, rubros, formulario de postulación, ubicación y canales de contacto.

## Estructura real del proyecto

```text
paseo-artesanal-marmol-web/
|-- index.html
|-- styles/
|   |-- tokens.css
|   |-- base.css
|   |-- layout.css
|   |-- components.css
|   `-- landing.css
|-- assets/
|   |-- images/
|   |   |-- about/
|   |   |-- brand/
|   |   |-- categories/
|   |   `-- hero/
|   `-- js/
|       |-- navigation.js
|       `-- ui.js
|-- CNAME
|-- sitemap.xml
`-- README.md
```

## Tecnologías

- HTML5 semántico
- CSS3 con custom properties
- Bootstrap 5.3 desde CDN para grilla y utilidades
- JavaScript vanilla
- Google Fonts: Bricolage Grotesque, Outfit e Instrument Serif
- Material Symbols para iconografía

## Arquitectura CSS

- `styles/tokens.css`: colores, tipografías, radios, sombras, espaciados y tokens compartidos.
- `styles/base.css`: reset base, estilos globales, foco, scroll y overlay de textura.
- `styles/layout.css`: header, hero, mapa, footer y estructura mayor de página.
- `styles/components.css`: utilidades y componentes reutilizables como reveals, botones, glass cards, tipografía de sección, step cards y back-to-top.
- `styles/landing.css`: estilos específicos de secciones de la landing: Sobre, Identidad, Rubros, Participar y Contacto.

## Sistema visual

Los tokens principales viven en `styles/tokens.css`.

| Token | Valor actual | Uso |
| --- | --- | --- |
| `--color-primary` | `#FF7043` | Acciones y acentos principales |
| `--color-primary-light` | `#FFB74D` | Acentos secundarios |
| `--color-terracota` | `#B55D30` | Títulos y marca visual |
| `--color-header-bg` | `#fdebd5` | Fondo del header y bloques cálidos |
| `--color-hero-bg-start` | `#fdfaf6` | Inicio del fondo del hero |
| `--color-bg` | `#f4eee8` | Fondo de secciones |
| `--color-section-alt` | `#f8e9dd` | Fondo alternativo de sección |
| `--color-footer-bg` | `#2D3436` | Fondo del footer |
| `--header-height` | `110px` | Offset compartido entre CSS y navegación |

## SEO y dominio

- Dominio configurado: `www.paseoartesanalmarmol.com`
- `CNAME`, `sitemap.xml`, canonical, Open Graph y JSON-LD usan el dominio con `www`.
- Los datos estructurados viven en `index.html` como `LocalBusiness`.

## Uso local

Abrir `index.html` directamente en el navegador o servir la carpeta con un servidor estático:

```bash
python -m http.server 4173 --bind 127.0.0.1
```

Luego abrir:

```text
http://127.0.0.1:4173/
```

## Validación

El repo no incluye `package.json`, lint, typecheck ni tests automatizados versionados.

Validaciones estáticas recomendadas:

```bash
git diff --check
rg "var\\(--" styles
rg "style=" index.html
```

Durante la auditoría se usaron specs temporales de Playwright fuera del repo para validar responsive, navegación por anchors, lazy map, metadata SEO y smoke de accesibilidad.

## Información de la feria

- Ubicación: Plaza Nuestra Señora de Luján (Plaza de Mármol), Bynnón 2932, José Mármol.
- Fechas: se confirman por Instagram para cada edición.
- Horario habitual: 15:30 a 19:30 hs, con variaciones según estación.

## Contacto

- Email: paseo.artesanal.marmol@gmail.com
- Instagram: [@paseo_artesanal_marmol](https://www.instagram.com/paseo_artesanal_marmol/)

## Licencia

Este proyecto es propiedad del Paseo Artesanal Mármol. Todos los derechos reservados.

Con el apoyo del Municipio de Almirante Brown.
