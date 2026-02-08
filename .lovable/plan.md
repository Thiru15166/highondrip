

# HIGH ON DRIP — Premium Fashion E-Commerce UI

## Design Foundation

### Brand Tokens & Typography System
- **Color palette**: Off-white (`#FAF9F6`), sand/beige (`#E8E0D5`), warm black (`#1A1A1A`), muted stone accents
- **Typography**: Playfair Display for headlines (serif with character), Inter for body text (clean sans-serif)
- **"HIGH ON DRIP"** rendered as a bold, confident logotype — no playful fonts
- **Spacing scale**: Generous, editorial-grade whitespace throughout — luxury through restraint
- Custom CSS variables for consistent reuse across all components

---

## Pages & Components

### 1. Header / Navigation
- Clean, minimal top bar with strong grid discipline
- Logo "HIGH ON DRIP" as a left-aligned or centered typographic anchor
- Navigation links: **Home · Shop · Collection · Account**
- Simple cart icon (no badges, no animation)
- Sticky on scroll with subtle background opacity transition

### 2. Homepage
- **Hero Section**: Typography-driven — a bold 2–4 word headline in large Playfair Display, a light-weight subheading beneath, and a single calm CTA button ("Shop Collection") in black
  - Optional neutral-toned background or restrained lifestyle image
  - No full-bleed tall imagery — respects square image constraints
- **Editorial Content Blocks**: Alternating text + square image sections with generous padding, conveying brand story through layout rhythm
- **Featured Products Grid**: 3-column grid of square product cards with large spacing — image, name, price only
- **Brand Statement Section**: A centered typographic moment — a short tagline or philosophy line with maximum whitespace

### 3. Product Listing Page (Shop)
- **Responsive grid**: 2 columns on mobile, 3–4 on desktop
- **Product cards** show only: square image, product name (serif), price (sans-serif)
- No badges, ratings, quick-buy buttons, or overlays
- **Hover**: Subtle scale (≤1.03) and opacity fade — clean, no text overlays
- Large gaps between cards for breathing room
- Minimal page header with collection name

### 4. Product Detail Page
- **Split layout**: Left side — square image gallery (stacked thumbnails or minimal carousel); Right side — product info
- **Information hierarchy**:
  1. Product name (large Playfair Display serif)
  2. Price (clean, understated)
  3. Short editorial-style description (2–3 lines, calm tone)
  4. Size selector (text-based, minimal — no dropdown, just clickable text options)
  5. "Add to Cart" button — black fill, confident but calm
- Layout stays balanced despite square imagery — whitespace fills the vertical gap elegantly
- "You May Also Like" section at bottom with 3-4 square product cards

### 5. Footer
- Editorial-style layout with generous vertical spacing
- Short brand story paragraph about HIGH ON DRIP
- Minimal social links (icons only, muted)
- Navigation echo (Shop, Collection, About)
- Clean copyright line
- No clutter, no newsletter signup overload

---

## Interactions & Motion
- All transitions: slow, subtle (300–500ms ease)
- Hover states: opacity fade + micro-scale (≤1.03)
- Page transitions: gentle fade-in on route change
- No bounce, pop, glow, or gamification effects
- Scroll-triggered subtle fade-up for content blocks

---

## Routing Structure
- `/` — Homepage
- `/shop` — Product Listing
- `/product/:id` — Product Detail
- Navigation between pages with consistent header/footer

---

## What This Delivers
A high-fidelity, fully navigable UI that makes **HIGH ON DRIP** feel like a serious, premium fashion brand — through typography, spacing, grid discipline, and restraint. Every element is intentional. No visual noise, no filler, no fake checkout flows.

