# Specification

## Summary
**Goal:** Resolve build/deploy blockers and successfully deploy the existing application without adding new product features.

**Planned changes:**
- Identify and fix any build-time errors in the current codebase (frontend and/or backend) that prevent deployment.
- Ensure the backend remains a single Motoko actor with all logic in `backend/main.mo` (when present).
- Make any necessary deployment-related adjustments while avoiding edits to the specified immutable frontend paths.
- Keep all user-facing text in English.

**User-visible outcome:** The application builds successfully and can be deployed and accessed without build/deploy failures.
