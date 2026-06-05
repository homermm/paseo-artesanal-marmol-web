# Paseo Artesanal Marmol

Sitio web oficial del Paseo Artesanal Marmol, una feria autogestiva de produccion artesanal ubicada en Jose Marmol, Almirante Brown, Buenos Aires.

## Sobre el proyecto

Este es un sitio web estatico de una sola pagina. Presenta la feria, su identidad, rubros, formulario de postulacion, ubicacion y canales de contacto.

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

## Tecnologias

- HTML5 semantico
- CSS3 con custom properties
- Bootstrap 5.3 para grilla y utilidades
- JavaScript vanilla
- Google Fonts: Bricolage Grotesque, Outfit e Instrument Serif
- Material Symbols para iconografia

## Sistema visual

Los tokens principales viven en `styles/tokens.css`.

| Token | Valor actual | Uso |
| --- | --- | --- |
| `--color-primary` | `#FF7043` | Acciones y acentos principales |
| `--color-primary-light` | `#FFB74D` | Acentos secundarios |
| `--color-terracota` | `#B55D30` | Titulos y marca visual |
| `--color-header-bg` | `#fdebd5` | Fondo del header y bloques calidos |
| `--color-bg` | `#f4eee8` | Fondo de secciones |
| `--color-footer-bg` | `#2D3436` | Fondo oscuro auxiliar |

## Uso local

Abrir `index.html` directamente en el navegador o servir la carpeta con un servidor estatico:

```bash
npx serve .
```

## Informacion de la feria

- Ubicacion: Plaza Nuestra Senora de Lujan (Plaza de Marmol), Bynnon 2932, Jose Marmol.
- Fechas: se confirman por Instagram para cada edicion.
- Horario habitual: 15:30 a 19:30 hs, con variaciones segun estacion.

## Contacto

- Email: paseo.artesanal.marmol@gmail.com
- Instagram: [@paseo_artesanal_marmol](https://www.instagram.com/paseo_artesanal_marmol/)

## Licencia

Este proyecto es propiedad del Paseo Artesanal Marmol. Todos los derechos reservados.

Con el apoyo del Municipio de Almirante Brown.
