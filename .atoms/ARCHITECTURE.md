# Architecture Design

## System Overview
Single-page React application (LP format) for a Kyoto construction company corporate site.

## Tech Stack
- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- Google Fonts (Noto Serif JP, Noto Sans JP)

## Module Design
| Module | Responsibility | Key Files |
|--------|---------------|-----------|
| Main Page | All sections in one page | src/pages/Index.tsx |
| Components | Reusable section components | src/components/ |
| Styles | Global styles, fonts, colors | src/index.css |

## Tech Decisions
| Decision | Choice | Rationale |
|----------|--------|-----------|
| Single page vs multi-page | Single page LP | User requirement |
| Font loading | Google Fonts CDN | Simplest approach for Japanese fonts |
| Map embed | Google Maps iframe | No API key needed |
| Form handling | Client-side only | No backend specified |

## File Tree Plan
```
src/
├── pages/
│   └── Index.tsx          # Main LP page with all sections
├── components/
│   ├── HeroSection.tsx    # Hero with background image
│   ├── AboutSection.tsx   # Company introduction
│   ├── ServicesSection.tsx # 3-column service cards
│   ├── FeaturesSection.tsx # 3 strengths
│   ├── VoiceSection.tsx   # Customer testimonials
│   ├── CompanySection.tsx # Company info table + map
│   ├── ContactSection.tsx # Contact form
│   └── Footer.tsx         # Footer
├── index.css              # Global styles + fonts
├── App.tsx                # Router
└── main.tsx               # Entry point
```

## Implementation Guide
- All sections implemented as separate components imported into Index.tsx
- Tailwind custom colors configured in index.css CSS variables
- Google Fonts loaded via @import in index.css
- Responsive design using Tailwind breakpoints