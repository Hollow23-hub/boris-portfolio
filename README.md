# Boris Beltrán — Portfolio

Bilingual portfolio of Boris Beltrán, a frontend engineer focused on e-commerce and scalable web experiences.

## Stack

- React and Vite
- GSAP
- Canvas API
- Phosphor Icons
- Sanity Content Lake (public, published content)

## Content management

Edit the five public featured projects and bilingual hero/contact copy in the
[personal Sanity Studio](https://boris-beltran-portfolio-cms.sanity.studio/).
Project order follows the `Display order` field. Publish a document to make
its changes visible; drafts do not appear on the website. The portfolio reads
published content from project `6g5kthfo`, dataset `production`, without an API
token. If Sanity is unavailable, the bundled text and project data remain as a
fallback.

The public CV PDFs still download from `public/curriculum`. The `Portfolio
content` document has optional English and Spanish PDF fields; when both are
uploaded and published, the site will use those Sanity assets automatically.
Only upload CV versions intended to be public: Sanity file asset URLs are not
private. Do not add confidential projects or credentials to this public
dataset.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```
