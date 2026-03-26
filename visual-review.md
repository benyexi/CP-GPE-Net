# Visual Review Findings - 2026-03-26

## Hero Section
- ✅ Text is readable with strong shadow
- ✅ "CP-GPE" white, "Net" gold — good contrast
- ✅ Stats bar (22 / 12+ / 15+ / 5+) visible at bottom of hero
- ✅ Stats bar NOT overlapping with navbar — it's at the bottom of hero, not top
- ✅ CTA button has golden glow effect

## About Section  
- ✅ Light cream background (bg-warm-50)
- ✅ Left side has full content: 2 paragraphs + 4 stat cards (2x2) + PI card
- ✅ Right side has image with caption
- ✅ No empty space visible
- ✅ Network Goals dark card with 4 items
- ✅ Partnering Institutions pills at bottom

## Network Section
- ✅ Dark background (bg-forest-900)
- ⚠️ MAP ISSUE: Default view shows ENTIRE WORLD, not China-focused!
  - The map center should be [35, 105] zoom 4 but it seems to be showing world view
  - Sites are clustered in China + 1 in USA, very zoomed out
  - Need to verify the FitBounds component — it may be overriding the initial center/zoom
- ✅ Golden/orange markers visible
- ✅ Filter buttons present: All, China, North China, etc.
- ✅ Site table below map with all 22 sites

## Deep-Light Alternation
- Hero: dark (image) ✅
- About: light (cream) ✅  
- Network: dark (forest-900) ✅
- Need to scroll more to verify Research, Methods, Team, Data, News, Join
