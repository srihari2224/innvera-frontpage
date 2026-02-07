# Iceberg Clone - Transition Polish Plan

## Requirements

Polish the site's transitions and animations to match the smooth, cinematic feel of the reference icebergdoc.org website. This includes scroll-triggered animations, entrance effects, hover interactions, and section-to-section flow improvements.

## Current State Analysis

### Existing Transitions
- **Hero**: Basic fade-in/zoom-in animations for ICEBERG letters with staggered delays
- **BlurSentence**: Scroll-triggered blur/opacity/scale transitions (functional but could be smoother)
- **Header**: Logo hover animation with translate-y effect, nav link underline animations
- **ImpactProjects**: Basic hover scale on cards with image zoom
- **OrangeStatement**: Static - no entry animations
- **AboutNarrative**: Static - no scroll-triggered reveals
- **Footer**: Static - no entry animations

### Missing from Reference Site
1. **Smooth scroll-linked animations** (GSAP ScrollTrigger style)
2. **Character-by-character text reveals** on scroll
3. **Parallax depth effects** on images
4. **Staggered section entrances** with opacity/transform
5. **Magnetic cursor effects** on interactive elements
6. **Smooth horizontal scroll snapping** in projects gallery

## Implementation Phases

### Phase 1: Install Animation Library (Framer Motion)
Add Framer Motion for declarative, performant animations that integrate well with React/Next.js. This provides:
- `useScroll` and `useTransform` for scroll-linked animations
- `motion` components for entrance/exit animations
- `useInView` for intersection-based triggers
- Spring physics for natural easing

**File**: `package.json`
**Action**: Add `framer-motion` dependency

### Phase 2: Create Animation Utilities
Build reusable animation components and hooks for consistent behavior across sections.

**New file**: `src/lib/animations.ts`
- Custom easing curves matching reference site
- Scroll progress calculation utilities
- Stagger delay generators
- Common animation variants (fadeUp, fadeIn, scaleIn, blurIn)

### Phase 3: Enhance Hero Section Animations
Upgrade the ICEBERG letter animations with:
- Smoother spring-based character reveals
- Parallax movement on video background
- Subtle scale effect on scroll
- Improved scribble graphic animation

**File**: `src/components/sections/Hero.tsx`
- Replace CSS animations with Framer Motion variants
- Add `useScroll` for parallax video
- Implement staggered letter reveals with blur effect

### Phase 4: Polish BlurSentence Scroll Effect
Make the blur-to-focus transition smoother and more cinematic:
- Use Framer Motion's `useTransform` for smoother interpolation
- Add subtle y-axis parallax
- Implement per-character blur reveals (staggered)

**File**: `src/components/sections/BlurSentence.tsx`
- Refactor scroll logic to use `useScroll`
- Add spring-based interpolation
- Improve mobile performance

### Phase 5: Add AboutNarrative Scroll Reveals
Implement scroll-triggered reveals for the 01-02-03 narrative blocks:
- Fade-up entrance for each content block
- Parallax on background mountain image
- Number counter animation
- Text line-by-line reveal

**File**: `src/components/sections/AboutNarrative.tsx`
- Add `useInView` triggers for each step
- Implement staggered text reveals
- Add parallax to pinned background

### Phase 6: Animate OrangeStatement Text
Add word-by-word or phrase-by-phrase reveal animations:
- Staggered opacity/transform on each word
- Subtle scale pulse on emphasized words (THOUSANDS, INITIATIVES, etc.)
- SVG path draw animation for decorative element

**File**: `src/components/sections/OrangeStatement.tsx`
- Wrap words in motion spans
- Implement scroll-triggered stagger
- Add SVG stroke animation

### Phase 7: Enhance ImpactProjects Gallery
Improve the horizontal scroll experience:
- Smooth scroll-snap behavior
- Card entrance animations on scroll into view
- Enhanced hover states with subtle rotation/depth
- Improved image zoom timing

**File**: `src/components/sections/ImpactProjects.tsx`
- Add scroll-snap CSS
- Implement `useInView` for card entrances
- Enhance hover transform with rotation
- Add drag-to-scroll with momentum

### Phase 8: Footer Entrance Animation
Add subtle reveal animations as footer scrolls into view:
- Staggered link reveals
- Large "ICEBERG" watermark scale/opacity animation
- Newsletter form field focus animations

**File**: `src/components/sections/Footer.tsx`
- Add `"use client"` directive
- Implement section entrance animation
- Add staggered link reveals

### Phase 9: Global Smooth Scroll & Page Transitions
Implement site-wide smooth scrolling and section transitions:
- Lenis or native CSS smooth scroll
- Page load entrance animation sequence
- Section-to-section blend improvements

**Files**: 
- `src/app/layout.tsx` - Add smooth scroll provider
- `src/app/globals.css` - Add scroll-behavior and transition utilities

## Technical Decisions

### Animation Library: Framer Motion
**Rationale**: 
- Native React integration
- Hardware-accelerated animations
- Built-in scroll utilities
- SSR compatible with Next.js
- Smaller bundle than GSAP for this use case

### Easing Curves
Match reference site feel:
```js
const smoothEase = [0.25, 0.1, 0.25, 1.0]; // cubic-bezier
const springConfig = { damping: 30, stiffness: 200 };
```

### Performance Considerations
- Use `will-change` sparingly
- Prefer `transform` and `opacity` for GPU acceleration
- Implement `useReducedMotion` for accessibility
- Lazy-load animation components below fold

## Dependencies

- `framer-motion` (latest) - Core animation library
- No additional dependencies needed

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Performance on mobile | High | Use `transform`/`opacity` only, test on low-end devices |
| Hydration mismatches | Medium | Ensure animations start after mount with `useEffect` |
| Scroll jank | Medium | Use `requestAnimationFrame` throttling |
| Bundle size increase | Low | Framer Motion tree-shakes well (~15KB gzipped) |

## Success Criteria

- [ ] Hero letters animate smoothly with spring physics
- [ ] BlurSentence has buttery-smooth scroll reveal
- [ ] AboutNarrative steps fade in on scroll
- [ ] OrangeStatement text reveals word-by-word
- [ ] ImpactProjects cards have polished entrance/hover
- [ ] Footer elements stagger in on view
- [ ] No visible jank on 60fps+ displays
- [ ] Reduced motion preference respected
