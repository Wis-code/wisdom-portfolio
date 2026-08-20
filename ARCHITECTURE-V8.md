# Portfolio Architecture V8 — foundation pass

This pass stops treating the portfolio as one branding case study with a hero attached.

## What is now structural

### 1. Project model
A project has an explicit `type`:
- brand identity
- campaign / series
- single design
- poster
- book cover
- social set
- experimental
- other visual work

This means the renderer can make a different presentation decision for each kind of work.

### 2. Deterministic layout engine first
The layout engine now receives the full project, not only an asset array.

It chooses:
- identity stages for logos
- pattern triptychs
- campaign grids
- single-focus presentations
- cover stages
- sequences
- mosaics

AI can enrich tags later, but public visitors never need an AI call.

### 3. Upload-time analysis
The admin reads image dimensions in-browser and infers:
- aspect ratio
- likely asset kind
- default importance
- grouping

This costs nothing and happens before any future AI enrichment.

### 4. Firestore-backed publishing
The admin can:
- save drafts
- publish projects
- mark a project featured
- upload assets
- edit asset kind / importance / group
- reorder assets

The public homepage loads published Firestore projects after hydration, with the seed project as a safe fallback.

A project route can also resolve a Firestore-only slug, so adding a new project does not require adding a new hardcoded route.

### 5. Admin authentication
`/admin` is now behind Firebase email/password authentication when Firebase is configured.

Firestore rules remain the final permission boundary.

### 6. Color system
`app/system.css` is imported after the legacy stylesheet and establishes one canonical Wiscode token system:
- `#242E3D`
- `#66FFCC`
- `#FDFFFE`

The site can now be migrated section-by-section without rewriting the 84KB legacy stylesheet again.

## Still intentionally not in this pass
- AI/Gemini visual classification
- cached long-image export
- cached PDF generation service
- client-review screenshot manager
- full site-settings editor
- removal of the remaining dead selectors inside legacy `globals.css`

Those are now cleanly separable next passes instead of being mixed into hero work.
