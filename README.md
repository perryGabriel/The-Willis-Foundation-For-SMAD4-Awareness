# The Willis Foundation for SMAD4 Awareness

This repository contains an early-stage static website for sharing awareness information, family stories, practical resources, and long-term foundation plans related to SMAD4-associated conditions.

## Project goals

- Raise awareness and share educational resources.
- Offer a place for family stories, blogs, success stories, and memorials.
- Organize medical resources (genetic testing, specialists, care pathways).
- Share donation and future foundation information.

## Site structure

Website files are organized under `doc/` so future contributors can keep each section modular.

```text
/
├── doc/
│   ├── index.html                # Main landing page
│   ├── assets/
│   │   └── style.css             # Shared site styling
│   ├── donation/
│   │   └── index.html            # Placeholder: Donation & fundraising
│   ├── stories/
│   │   └── index.html            # Placeholder: Blogs, success stories, memorials
│   ├── research/
│   │   └── index.html            # Links to literature review and glossary PDFs
│   ├── resources/
│   │   └── index.html            # Placeholder: Medical resources
│   └── foundation/
│       └── index.html            # Placeholder: Foundation details
├── ChatGPT_Lit_Review.pdf
└── Glossary.pdf
```

## Future growth pattern

To keep maintenance manageable, add major sections as their own subdirectories under `doc/` (for example `doc/blog/`, `doc/news/`, `doc/thanks/`).

Guideline for new sections:
1. Create a folder for the section.
2. Add an `index.html` inside that folder.
3. Reuse shared styles from `doc/assets/style.css`.
4. Add navigation links from `doc/index.html`.

## Local preview

From the repository root:

```bash
python -m http.server 4173
```

Then open:
- `http://localhost:4173/doc/` for the website.

## Contribution notes

- Keep placeholder pages simple until finalized content is available.
- Preserve respectful and family-centered language.
- Prefer plain HTML/CSS unless a future contributor decides to migrate to a framework.
