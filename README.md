# Onyedika Portfolio — visual portfolio platform

A Next.js 16.3 portfolio built for Firebase App Hosting. It combines a curated public portfolio, adaptive case-study layouts and an owner-only studio for publishing projects and managing public links.

## Included now

- Sculpted dark hero using Onyedika’s transparent portrait
- Controlled mint atmosphere, dark portrait treatment and faint design traces
- Responsive desktop + mobile frontend
- Five seeded case studies: Dera’s Apparel, Asher Concept, Beef Bliss, Revival Fire and Gloss & Glow
- `composeProject()` layout engine that arranges work by role, aspect ratio and importance
- Support model for branding, campaigns, single flyers, posters, book covers and experimental work
- `/admin` project composer with batch uploads, automatic geometry analysis, ordering and publishing
- Contact-and-links manager; disabled profiles stay private until switched live
- Image geometry analysis in the browser before any AI call
- Firebase Storage / Firestore hooks (activate after adding Firebase env values)
- Client review architecture (hidden publicly until review screenshots exist)
- WhatsApp and email CTAs using the supplied public contact details
- Google owner sign-in with Firestore and Storage writes restricted to `wiscode01@gmail.com`
- Print stylesheet so each case study can be saved as PDF immediately
- App Hosting runtime configured to scale to zero (`minInstances: 0`) with a small max of 3 instances

## Run locally

```bash
npm install
npm run dev
```

Open:

- `/` — portfolio
- `/work/deras-apparel` — featured identity case study
- `/admin` — owner studio

## Connect Firebase

1. Create/use a Firebase project on Blaze.
2. Enable Firestore, Cloud Storage and Authentication.
3. Copy `.env.example` to `.env.local`.
4. Add your Firebase Web App configuration values.
5. Deploy the included `firestore.rules` and `storage.rules`.
6. In Firebase App Hosting, connect the GitHub repo and choose the live branch.

The UI works in local preview mode without Firebase. Once Firebase is configured, uploaded admin images go to Cloud Storage and project drafts can be written to Firestore.

## Cost strategy

The intended production flow is upload-time intelligence, not visitor-time intelligence:

1. Read image dimensions locally for free.
2. Infer obvious roles cheaply from filename / metadata.
3. When AI is added, classify/embedding-process each new asset once.
4. Store the generated tags + chosen layout in Firestore.
5. Public visitors only read the cached result.
6. Re-run AI only when the owner asks to regenerate or uploads changed assets.
7. Generate PDF / long-image exports on publish or on explicit request, then cache them.

This avoids paying for AI work on every page view.

## Next implementation pass

- Review screenshot upload + crop + publish controls
- Drag-and-drop ordering + direct cover selection
- AI enrichment using Vertex AI / Gemini only after deterministic rules finish
- Cached PDF and long-image export pipeline
- Marketing-site handoff destination when that site exists


## V4 visual revision
- Uses the supplied high-resolution portrait as the master source (no AI face recreation).
- Wiscode mark added to the top navigation.
- Hero rebuilt around Wiscode brand colors #242E3D, #66FFCC and #FDFFFE.
- Visible multi-field gradient atmosphere with pointer-responsive movement.
- Reduced hero copy to name, role and Identity · Systems · Direction.
- Added deliberate portrait margins so the subject does not collide with viewport edges.
- Selected Work now stays inside the personal brand environment; client colors live inside project imagery.


## V4 focus
Portrait-first hero hierarchy, darker slate atmosphere, restrained mint glow, and subtle design-workspace artifacts. Selected Work and case-study presentation remain intentionally unchanged.
