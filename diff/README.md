# LS UNIVERSITY Synthetic Visitor Crawler

This folder contains an automated crawler that simulates random visitors and submits the admission form on `admission.html`.

## Setup

1. From repository root:
   - `cd diff`
   - `npm install`

2. Serve the site locally (example):
   - `npx serve -s ..` or `python -m http.server 5500`

   OR direct GitHub Pages host:
   - `https://<your-gh-username>.github.io/<repo>/admission.html`

3. Run crawler:
   - `npm run crawl` (local default)
   - `TARGET_URL="https://<your-gh-username>.github.io/<repo>/admission.html" npm run crawl`
   - or `npm run crawl "https://<your-gh-username>.github.io/<repo>/admission.html"`

## Output

- `results.csv`: submission log
- `screenshots/`: screenshot per simulated visitor

## Notes

- The crawler targets `http://localhost:5500/admission.html`.
- If you use a different host/port, update `targets` in `crawler.js`.
