# Specification

## Summary
**Goal:** Rebrand the existing app UI into a cohesive “Prize Portal” experience while keeping the current user flow unchanged.

**Planned changes:**
- Update global visual styling (theme tokens, colors, typography, surfaces, component styling) to a distinct Prize Portal look that is not neon/TikTok-like and does not use a blue/purple primary palette.
- Replace all TikTok/Winner Verification Portal references in UI copy with Prize Portal branding and ensure all user-facing text is English.
- Swap TikTok/neon generated asset references (logo, hero, icons, backgrounds) to Prize Portal-branded generated assets loaded from `frontend/public/assets/generated`.
- Update eligibility checklist copy to remove TikTok-specific promotional references while keeping checklist interaction behavior the same.
- Ensure all core screens (PrizeLookup, ActivationFlow, EligibilityFlow, IdentityVerification, ReceiptMethod, CompletionScreen) match the new Prize Portal brand without changing step order or transitions.

**User-visible outcome:** The app looks and reads like a Prize Portal across all screens (with updated branding, theme, and assets), while users complete the same exact lookup → activation → eligibility → identity upload → receipt → completion journey as before.
