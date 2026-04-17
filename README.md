# The Willis Foundation for SMAD4 Awareness

This repository contains a static website for sharing awareness information, family stories, practical resources, and long-term foundation plans related to SMAD4-associated conditions.

The site can be viewed [here](https://perrygabriel.github.io/The-Willis-Foundation-For-SMAD4-Awareness/index.html).

## Where the live site content is managed

Use the `doc/` directory as the main website source.

```text
/
├── doc/
│   ├── index.html
│   ├── assets/
│   │   ├── style.css
│   │   └── cards.js                 # Dynamic card renderer
│   ├── content/                     # Card data (easy-to-edit JSON)
│   │   ├── donation/cards/
│   │   ├── stories/cards/
│   │   ├── research/cards/
│   │   ├── resources/cards/
│   │   └── foundation/cards/
│   ├── donation/index.html
│   ├── stories/index.html
│   ├── research/index.html
│   ├── resources/index.html
│   └── foundation/index.html
├── ChatGPT_Lit_Review.pdf
└── Glossary.pdf
```

## Card system (how content is added)

Each page loads cards from its matching folder:

- Donation page → `doc/content/donation/cards/`
- Stories page → `doc/content/stories/cards/`
- Research page → `doc/content/research/cards/`
- Resources page → `doc/content/resources/cards/`
- Foundation page → `doc/content/foundation/cards/`

Inside each `cards/` folder:

1. `index.json` lists the card files to load, in display order.
2. Each card file is one JSON object (one card per file).

### `index.json` format

```json
{
  "cards": ["first-card.json", "second-card.json"]
}
```

### Card file format

```json
{
  "title": "Card title",
  "description": "Short summary shown on the page.",
  "url": "https://example.com",
  "source": "Who published it",
  "type": "blog",
  "date": "2026-04-17",
  "tags": ["smad4", "family"],
  "external": true
}
```

### Field reference

- `title` (required): Card heading.
- `description` (recommended): Short context.
- `url` (optional): Link destination. Leave as empty string for info-only cards.
- `source` (optional): Publisher or origin.
- `type` (optional): Category label (examples: `fundraiser`, `paper`, `blog`, `doctor recommendation`, `news`).
- `date` (optional): ISO date, example `2026-04-17`.
- `tags` (optional): List of short labels.
- `external` (optional):
  - `true` or omitted = open in new tab.
  - `false` = open in same tab (for internal site links).

## How to add a new entry to any page

1. Open the correct folder in `doc/content/<page>/cards/`.
2. Create a new JSON file (example: `my-new-resource.json`) by copying an existing card.
3. Fill in the fields (`title`, `description`, `url`, etc.).
4. Edit `index.json` in the same folder and add your new filename to the `cards` array.
5. Save and preview locally.

If a card file is not listed in `index.json`, it will **not** be shown.

## Local preview

From repository root:

```bash
python -m http.server 4173
```

Then open:

- `http://localhost:4173/doc/`

> Note: Cards are loaded with `fetch()`, so open the site through a local server (not via direct `file://` paths).

## Contribution notes

- Keep language respectful and family-centered.
- Prefer plain HTML/CSS/JSON for easy maintenance by non-technical contributors.
- Keep each card description concise and easy to scan.
