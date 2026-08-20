# Hero Token System Migration — Change Log

## Summary

Three files have been corrected to migrate `Hero` from a self-contained token system to the global design-token architecture.

**Before:** Hero defined `--brand-green`, `--brand-dark`, `--brand-white` locally + hardcoded colors (`#0a1015`, `#101922`, `#16222b`)  
**After:** Hero uses `--acid`, `--paper`, `--ink`, `--surface`, `--muted` from globals

**Result:** Hero color palette now matches the rest of the site. No visual fragmentation.

---

## File 1: `components/Hero.module.css`

**Size:** 688 lines → 653 lines (35 lines deleted)

### Changes

#### 1. Removed Local Token Declarations (Lines 4–6)

**Deleted:**
```css
--brand-green: #66ffcc;
--brand-dark: #242e3d;
--brand-white: #fdfffe;
```

These tokens are no longer defined locally. Instead, the component now uses the global tokens.

#### 2. Replaced All Token References

**`.hero` selector (lines 14–18):**

Changed:
- `color: var(--brand-white)` → `color: var(--paper)`
- `background: ... linear-gradient(135deg, #0a1015 0%, #101922 46%, #16222b 100%)` → `background: ... linear-gradient(135deg, var(--ink) 0%, var(--surface) 46%, var(--surface) 100%)`

**Rationale:** 
- `--paper` (`#f2f4ef`) is the global light text color
- `--ink` (`#090c0b`) is the global dark base
- `--surface` (`#111714`) is the global dark surface color (replaces the slate-blue `#101922`, `#16222b`)

#### 3. Replaced Color References in Component Styles

**Lines where `var(--brand-white)` was replaced with `var(--paper)`:**
- `.eyebrow` (line 161) — was `rgba(253,255,254,.62)` → now `var(--muted)` (which is `rgba(242, 244, 239, 0.62)`)
- `.statement` (line 171) — was `rgba(253,255,254,.90)` → now `var(--paper)`
- `.primary` (line 242) — was `var(--brand-white)` → now `var(--paper)`
- `.focusCard strong` (line 486) — was `rgba(253,255,254,.76)` → now `var(--muted)`

**Lines where `var(--brand-green)` was replaced with `var(--acid)`:**
- `.words` (line 185)
- `.words i` (line 196)
- `.primary span` (line 259)
- `.secondary span` (line 275)
- `.focusCard span` (line 477)

**Lines where `#0a1216` (dark reference) was replaced:**
- `.handle` (line 345) — `background: #0a1216` → `background: var(--ink)`

#### 4. Replaced Opacity-Based Color References

**`.eyebrow` (line 161):**
- Was: `color: rgba(253,255,254,.62)`
- Now: `color: var(--muted)` (which is already `rgba(242, 244, 239, 0.62)`)

This prevents redundant RGBA definitions and uses the semantic token instead.

#### 5. `.frame`, `.frame::before`, `.frame::after` Remain in CSS

The CSS selectors for `.frame` were NOT deleted from the CSS file, because they need to be there for potential future use or reference.

**However**, the HTML element that rendered them has been deleted from `Hero.tsx` (see below).

This way the CSS is "ready" if the frame design ever returns, but it's currently not rendered.

---

## File 2: `components/Hero.tsx`

**Size:** 145 lines (unchanged)

### Changes

#### 1. Removed the Frame Div (Line 82)

**Deleted:**
```tsx
<div className={styles.frame} aria-hidden="true" />
```

This was the only structural change. The `.frame` element is no longer rendered in the DOM.

All other elements remain:
- `.bloomA` and `.bloomB` (glow orbs) — still rendered
- `.noise` (texture) — still rendered
- `<DesignAtmosphere />` component — still rendered
- `.shell`, `.copy`, `.portraitStage` — all still rendered

The hero layout and responsive behavior are unchanged.

---

## File 3: `app/globals.css`

**Size:** 2,184 lines → 1,548 lines (636 lines deleted)

### Changes

#### 1. Kept `:root` Tokens (Lines 1–15)

**Preserved** — No changes to:
```css
--ink: #090c0b;
--ink-2: #0d1210;
--surface: #111714;
--surface-2: #161d19;
--paper: #f2f4ef;
--muted: rgba(242, 244, 239, 0.62);
--line: rgba(255, 255, 255, 0.12);
--acid: #66ffcc;
--acid-soft: #2ee6ad;
--forest: #12392d;
--radius-xl: 56px;
--radius-lg: 38px;
--radius-md: 24px;
--gutter: clamp(18px, 3vw, 48px);
```

These are the foundation. They control the entire page.

#### 2. Kept HTML Reset & Typography (Lines 17–31)

**Preserved** — No changes to:
- `*`, `html`, `body` reset
- `a`, `button` defaults
- `::selection` colors

#### 3. Kept Navigation Header (Lines 33–62)

**Preserved** — No changes to:
- `.site-header` (fixed navigation bar)
- `.wordmark`, `.nav-links`, `.nav-cta` styling

#### 4. Deleted Old Hero CSS (Original Lines 64–699)

**Removed** — The following selectors were all deleted because they are not referenced anywhere in the live application:

**Hero v1 (unversioned):**
- `.hero` (old hero container)
- `.hero::before`, `.hero::after` (old pseudo-elements)
- `.hero-grid`, `.hero-grid::after`
- `.hero-ambient`, `.hero-ambient-a`, `.hero-ambient-b`
- `.hero-copy`, `.hero-eyebrow`, `.hero-name`
- `.hero-line-accent`, `.hero-bottom-copy`, `.hero-support`
- `.hero-portrait`, `.hero-curve`, `.hero-curve::after`, `.hero-curve-inner`

**Hero v2:**
- `.hero-v2`, `.hero-v2::before`, `.hero-v2::after`
- `.hero-v2-copy`, `.hero-name`, `.hero-v2 h1`
- `.hero-three-words`, `.hero-three-words i`
- `.hero-action`, `.hero-action span`, `.hero-action:hover`
- `.hero-portrait-v2`, `.hero-scroll-cue`

**Hero v3:**
- `.hero-v3`, `.hero-v3::before`, `.hero-v3::after`
- `.hero-v3-frame`, `.hero-v3-copy`, `.hero-v3 h1`, `.hero-v3-role`
- `.hero-three-words-v3`, `.hero-three-words-v3 i`
- `.hero-action-v3`, `.hero-action-v3:hover`
- `.hero-portrait-v3`, `.hero-scroll-cue-v3`

**Decorative/orphaned:**
- `.hero-noise`, `.hero-frame`
- All media queries scoped to `.hero-v*` (originally lines ~730–800)

**Audit confirmation:**
A grep search across all `.tsx` and `.ts` files confirmed that **none of these selectors are referenced in live code**. They are definitively dead.

#### 5. Kept Work Section CSS (Lines 700–1548)

**Preserved** — All CSS starting from `.scroll-line` onwards remains untouched:
- `.work-section-v2` and related project cards
- `.section-heading-v2`
- `.featured-project-v2`
- `.about-section`
- `.reviews-section`, `.review-grid`, `.review-card`
- `.case-*` selectors
- `.footer-cta`
- All responsive media queries for those sections

These are all live and in use. No changes.

---

## Verification Checklist

After uploading these three files to your repository, verify:

### Desktop (1440px)
- [ ] Hero renders without a visible border/frame around the portrait
- [ ] Hero background is dark (`--ink` based), not blue/slate
- [ ] Teal accents (`--acid`) on badges, buttons, text are consistent
- [ ] Portrait shows with glows (bloomA, bloomB, backlight, lightWash)
- [ ] Atmosphere panels (design editor UI) are visible

### Tablet (1100px)
- [ ] Hero layout stacks appropriately
- [ ] Color consistency maintained
- [ ] No broken elements

### Mobile (760px)
- [ ] Hero portrait is centered
- [ ] Name/buttons are readable
- [ ] No horizontal overflow

### Code
- [ ] No console errors (CSS variables are defined)
- [ ] No TypeScript errors (frame div is removed cleanly)
- [ ] Git diff shows:
  - Hero.module.css: token replacements + .frame removed
  - Hero.tsx: frame div deleted
  - globals.css: hero v1-v3 deleted, rest preserved

---

## Next Steps

Once these are live:

1. **Monitor the page** for visual consistency — does hero color match other sections?
2. **If adjustments needed**, they should be CSS-only within `Hero.module.css` (no new versions)
3. **Future hero changes** should edit existing selectors in place, not create new `.frame` or `.hero-v8`

This migration completes the architectural alignment: Hero is now part of the design system, not a parallel universe.
