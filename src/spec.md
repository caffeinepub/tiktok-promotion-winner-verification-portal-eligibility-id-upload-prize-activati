# Specification

## Summary
**Goal:** Restyle the existing winner verification app UI to a TikTok-like dark, high-contrast, neon-accent aesthetic while keeping the current verification flow and behavior unchanged.

**Planned changes:**
- Update global theme tokens (colors/typography/surfaces) in `frontend/src/index.css` to a dark palette with neon accent highlights that works with existing Tailwind/shadcn token usage.
- Restyle all existing flow screens (PrizeLookup → ActivationFlow → EligibilityFlow → IdentityVerification → ReceiptMethod → CompletionScreen) for consistent dark-mode readability: buttons, cards, inputs, borders, alerts, muted text, and icon treatments.
- Adjust layout spacing and component sizing to feel more mobile-first (tight spacing, rounded UI, responsive widths) while remaining usable on desktop.
- Update the app shell (Header/Footer) and overall page layout styling (background, padding, subtle neon cues) without changing existing content, links, or attribution.
- Replace existing generated image assets with TikTok-like dark/neon variants and update UI references to use the new asset filenames under `/assets/generated/`.

**User-visible outcome:** The app looks and feels like a modern TikTok-style dark/neon mobile-first interface, while the winner verification process and steps remain exactly the same.
