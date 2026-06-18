---
name: Synthetix Portfolio
colors:
  surface: '#15121b'
  surface-dim: '#15121b'
  surface-bright: '#3b3742'
  surface-container-lowest: '#0f0d15'
  surface-container-low: '#1d1a23'
  surface-container: '#211e27'
  surface-container-high: '#2c2832'
  surface-container-highest: '#37333d'
  on-surface: '#e7e0ed'
  on-surface-variant: '#cbc3d7'
  inverse-surface: '#e7e0ed'
  inverse-on-surface: '#322f39'
  outline: '#958ea0'
  outline-variant: '#494454'
  surface-tint: '#d0bcff'
  primary: '#d0bcff'
  on-primary: '#3c0091'
  primary-container: '#a078ff'
  on-primary-container: '#340080'
  inverse-primary: '#6d3bd7'
  secondary: '#d2bbff'
  on-secondary: '#3f008e'
  secondary-container: '#6001d1'
  on-secondary-container: '#c9aeff'
  tertiary: '#ffb869'
  on-tertiary: '#482900'
  tertiary-container: '#ca801e'
  on-tertiary-container: '#3f2300'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#d0bcff'
  on-primary-fixed: '#23005c'
  on-primary-fixed-variant: '#5516be'
  secondary-fixed: '#eaddff'
  secondary-fixed-dim: '#d2bbff'
  on-secondary-fixed: '#25005a'
  on-secondary-fixed-variant: '#5a00c6'
  tertiary-fixed: '#ffdcbb'
  tertiary-fixed-dim: '#ffb869'
  on-tertiary-fixed: '#2c1700'
  on-tertiary-fixed-variant: '#673d00'
  background: '#15121b'
  on-background: '#e7e0ed'
  surface-variant: '#37333d'
typography:
  headline-xl:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  code:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  section-gap: 80px
---

## Brand & Style
The design system is engineered for a dual-identity professional: an ICT student with technical depth and an entrepreneur with vision. The aesthetic is **Modern-Minimalist with a Tech-Forward edge**, utilizing a deep, atmospheric dark mode to create a high-focus environment. 

The personality is confident, precise, and AI-literate. We achieve this through a "dark-canvas" approach where information is organized into distinct functional containers. The visual language avoids unnecessary decoration, instead using light-emitting accents (violet glows) to signify interactivity and modern capabilities. The goal is to evoke a sense of high-end software engineering mixed with a clean, accessible product-design sensibility.

## Colors
The palette is rooted in a monochromatic dark base to ensure the violet primary accent carries maximum visual weight. 

- **Primary (#8B5CF6):** Used for actionable items, key highlights, and brand moments.
- **Surface (#18181B):** Provides subtle contrast against the true-black background to define cards and navigation elements.
- **Accents:** Secondary violet is reserved for hover states and active indicators. 
- **Typography:** High-contrast off-white (#FAFAFA) ensures legibility, while muted zinc (#A0A0A8) handles meta-data and secondary information to maintain visual hierarchy.

## Typography
This design system utilizes **Hanken Grotesk** for its clean, geometric proportions that bridge the gap between "corporate professional" and "modern startup." Its high x-height ensures readability in dark mode.

For technical details and labels, we introduce **Geist**—a developer-centric font—to reinforce the ICT student background. 
- Headlines use tight letter-spacing and bold weights to command attention.
- Body text remains airy with a 1.5x line-height to prevent eye strain on dark backgrounds.
- All labels and "tech-tags" use uppercase Geist for a precise, systematic feel.

## Layout & Spacing
The layout follows a **structured grid model** with a generous 80px vertical rhythm between sections to signify confidence and breathing room.

- **Desktop:** A 12-column grid with a 1200px max-width.
- **Tablet:** 8 columns with 24px gutters.
- **Mobile:** Single column with 16px side margins. 

Components should use "stacking" logic (8px/16px/32px) to maintain a logical relationship between elements. Use wide padding (min 24px) inside cards to prevent a cramped "technical" feel, opting instead for an "executive" layout.

## Elevation & Depth
Depth is created through **Tonal Layering** and **Luminescent Accents** rather than traditional drop shadows.

1.  **Level 0 (Background):** #0F0F11 – The base canvas.
2.  **Level 1 (Cards/Surfaces):** #18181B – Defined by a subtle 1px border (#27272A) rather than a shadow.
3.  **Level 2 (Interactive):** When hovered, cards should display a faint, 15% opacity violet outer glow (80px spread) to simulate a "backlit" effect.

Use backdrop blurs (12px) on navigation bars and floating menus to maintain context while keeping the UI clean.

## Shapes
The shape language is consistently **Rounded**. 

A standard radius of 12px is applied to all primary containers and cards. This softens the "technical" nature of the ICT content, making the brand feel more entrepreneurial and approachable. 
- **Buttons & Small Chips:** Use the `rounded-lg` (16px) or full pill-shape for high-contrast actions.
- **Input Fields:** 12px radius to match cards.
- **Images/Media:** 12px radius with a subtle 1px inner stroke to prevent them from bleeding into the dark background.

## Components

### Buttons
- **Primary:** Solid Violet (#8B5CF6) with white text. High-contrast, 12px radius.
- **Secondary:** Transparent with a 1px border (#27272A). On hover, the border turns violet and a subtle glow appears.
- **Ghost:** No border, muted text, turns white on hover.

### Cards
Cards are the primary container for portfolio projects and business ventures.
- **Style:** Background #18181B, 12px radius, 1px border (#27272A).
- **Interactivity:** On hover, the border color shifts to #8B5CF6 and the card lifts slightly (4px translateY).

### Tech Tags / Chips
Used to denote languages (Python, React) or business skills.
- **Style:** Background #27272A (semi-transparent), Geist font, uppercase, 4px radius.

### Input Fields
- **Style:** Background #0F0F11 (inset look), 1px border (#27272A).
- **Focus State:** Border changes to #8B5CF6 with a 2px outer violet glow.

### Progress Indicators
For technical skills or project phases, use thin (4px) horizontal bars. The "filled" portion should be a violet-to-indigo gradient to add energy to the static UI.