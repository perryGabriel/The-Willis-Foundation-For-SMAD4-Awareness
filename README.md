# The Willis Foundation for SMAD4 Awareness

This repository contains a static website for sharing awareness information, family stories, practical resources, and long-term foundation plans related to SMAD4-associated conditions.

## Important: where to edit cards for the live site

The currently hosted site uses the **root HTML pages** (`index.html`, `donation.html`, etc.).

To add cards that appear on the live pages, edit:

- `content/donation/cards/`
- `content/stories/cards/`
- `content/research/cards/`
- `content/resources/cards/`
- `content/foundation/cards/`

> Note: there is also a `doc/` copy of the site for docs/reference. If you want both versions to stay in sync, mirror your content changes there too.

## Card system (how content is added)

Each page loads cards from its matching folder above.

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

1. Open the correct folder in `content/<page>/cards/`.
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

- `http://localhost:4173/index.html`

> Note: Cards are loaded with `fetch()`, so open the site through a local server (not via direct `file://` paths).

## Contribution notes

- Keep language respectful and family-centered.
- Prefer plain HTML/CSS/JSON for easy maintenance by non-technical contributors.
- Keep each card description concise and easy to scan.


## Browser tab icon (favicon)

The site now checks for a custom favicon file on load:

- Preferred file: `favicon-custom.png`
- Fallback file: `favicon-default.svg` (already included in this repo)

### Add your own icon

1. Create or export your icon as a PNG file.
2. Save it at the repository root as `favicon-custom.png`.
3. Commit and push — the site will use it automatically.

### Update the fallback icon

If you want to change the built-in default, replace `favicon-default.svg` with your updated SVG.

### Remove the custom icon

Delete `favicon-custom.png` and the site will automatically fall back to `favicon-default.svg`.
