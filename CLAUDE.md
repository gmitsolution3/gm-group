# CLAUDE.md

# IMPORTANT — READ FIRST

These instructions apply to EVERY task in this project.

You MUST follow these instructions before making any code changes.

The user's explicit request is the scope of the task.

DO NOT:

- modify unrelated files
- rename files unless explicitly requested
- rename components/functions/variables unless necessary
- refactor unrelated code
- redesign unrelated UI
- change architecture unnecessarily
- install dependencies unnecessarily
- fix unrelated bugs
- reformat unrelated code

ALWAYS:

1. Inspect the existing implementation first.
2. Determine the smallest change required.
3. Reuse existing patterns and architecture.
4. Modify only what is necessary.
5. Review your final diff for unnecessary changes.
6. Revert any changes unrelated to the user's request.

If you are unsure whether a change is necessary, DO NOT make it.

## Core Principle

**Make the smallest possible change required to complete the user's request.**

Do not modify, refactor, rename, reorganize, or "improve" anything unless it is directly required for the requested task.

---

# 1. READ BEFORE YOU CHANGE

Before making any code changes:

1. Understand the user's request completely.
2. Inspect the relevant files and existing implementation.
3. Identify how the existing code works.
4. Check related types, components, hooks, APIs, utilities, and imports when necessary.
5. Determine the minimum set of files that actually need modification.

**Never start changing code before understanding the existing implementation.**

---

# 2. MINIMAL CHANGE POLICY

Only change code that is necessary to fulfill the user's request.

### DO NOT:

- Refactor unrelated code.
- Rewrite working code unnecessarily.
- Rename variables without a functional reason.
- Rename files without a functional reason.
- Move files without a functional reason.
- Change folder structure unnecessarily.
- Change component architecture unnecessarily.
- Replace libraries unnecessarily.
- Change styling unrelated to the request.
- Change API contracts unnecessarily.
- Change database schemas unnecessarily.
- Change naming conventions that already exist.
- Reformat large files just because you touched them.
- Fix unrelated bugs unless explicitly asked.
- Remove code simply because you think it is unnecessary.
- Add abstractions unless they are actually needed.
- Introduce new dependencies unless required.

### ALWAYS:

Prefer modifying the existing implementation over replacing it.

If the existing implementation can solve the problem with a small modification, do that instead of creating a new architecture.

---

# 3. FILE RENAMING IS RESTRICTED

**Do NOT rename files unless the user explicitly asks for a rename OR the existing filename makes the requested functionality impossible.**

Before renaming a file, ask yourself:

> "Can I complete the user's request without renaming this file?"

If YES → **DO NOT rename it.**

If NO → explain why the rename is necessary before doing it.

The same rule applies to:

- folders
- components
- functions
- variables
- hooks
- API routes
- database fields

---

# 4. DO NOT MAKE UNREQUESTED IMPROVEMENTS

Do not treat a user's task as an opportunity to improve the entire codebase.

For example, if the user says:

> "Add pagination to the users table."

Do NOT automatically:

- refactor the table
- rename components
- redesign the table
- change the API structure
- replace the data-fetching library
- reorganize folders
- rewrite hooks
- change unrelated TypeScript types

Only implement pagination.

---

# 5. PRESERVE EXISTING BEHAVIOR

Existing functionality should remain unchanged unless the user explicitly requests otherwise.

Before changing something, consider:

- What currently works?
- What depends on this code?
- Could this change break existing behavior?
- Is this change actually required?

If something is working and unrelated to the task, **leave it alone.**

---

# 6. DO NOT GUESS

If an important requirement is unclear, do not make a large assumption.

Prefer:

1. Inspect the existing code.
2. Infer only what is strongly supported by the codebase.
3. If multiple approaches are reasonable and the choice affects architecture or behavior, ask the user.

Do not invent:

- API behavior
- database fields
- business rules
- component behavior
- authentication behavior
- validation rules
- design requirements

---

# 7. BEFORE EDITING, CREATE A CHANGE PLAN

Before making changes, internally determine:

### Required changes

- Which files must change?
- What specifically needs to change?
- Why does each file need to change?

### Unnecessary changes

- Which files do NOT need to change?
- Which existing code should remain untouched?

Use the smallest viable implementation.

For simple tasks, do not waste time creating a large plan. Just identify the minimal required changes.

---

# 8. DO NOT TOUCH UNRELATED FILES

If a file is not relevant to the user's request, leave it untouched.

Especially avoid modifying:

- configuration files
- package.json
- environment files
- database models
- API routes
- shared components
- global CSS
- authentication
- middleware
- unrelated pages

unless the task actually requires it.

---

# 9. DEPENDENCIES

Do not install a new package if the existing dependencies can accomplish the task.

Before adding a dependency:

1. Check whether an existing package already provides the functionality.
2. Check whether the functionality can reasonably be implemented with existing tools.
3. Only add a dependency when it provides a meaningful requirement that existing tools cannot satisfy.

Do not update package versions unless explicitly required.

---

# 10. STYLING

When modifying UI:

- Preserve the existing design system.
- Preserve existing spacing, typography, colors, and component patterns.
- Reuse existing components where possible.
- Do not redesign unrelated UI.
- Do not replace working UI components without a reason.
- Do not introduce a new styling approach when the project already has one.

If the user requests a visual change, change only the relevant UI.

---

# 11. TYPESCRIPT

Follow the existing TypeScript patterns.

Do not:

- weaken types just to make an error disappear
- use `any` unnecessarily
- rewrite existing types without reason
- introduce duplicate types
- change strictness settings to solve a local problem

Fix the actual type issue.

---

# 12. API / BACKEND

When working with APIs:

- Inspect the existing API structure first.
- Preserve existing request/response contracts unless the user asks to change them.
- Reuse existing services, controllers, utilities, and patterns.
- Do not create duplicate endpoints.
- Do not change database schemas unless required.
- Do not change authentication or authorization behavior unless required.

---

# 13. DATABASE

Treat existing database schemas as stable.

Do not add, remove, rename, or change database fields unless the user's request requires it.

Do not modify migrations, indexes, models, or database logic unnecessarily.

---

# 14. DELETIONS

Never delete code, files, components, functions, or dependencies merely because they appear unused or unnecessary.

Only delete something when:

- the user explicitly asks for deletion, OR
- it is definitely obsolete as a direct consequence of the requested change.

When uncertain, keep it.

---

# 15. REFACTORING

Refactoring is allowed only when:

1. The user explicitly asks for refactoring, OR
2. The requested functionality cannot reasonably be implemented without it.

Even then:

**Prefer a localized refactor over a broad refactor.**

Do not combine unrelated refactoring with feature work.

---

# 16. EXISTING CONVENTIONS HAVE PRIORITY

Follow the project's existing conventions.

Before introducing a new pattern, inspect nearby code.

If the project already has:

- a service pattern → use it
- a hook pattern → use it
- a component pattern → use it
- an API pattern → use it
- a validation pattern → use it
- an error-handling pattern → use it
- a folder structure → follow it

Do not introduce a competing pattern without a strong reason.

---

# 17. DO NOT REFORMAT UNRELATED CODE

When editing a file:

- Keep unrelated lines unchanged.
- Avoid automatic formatting of the entire file unless necessary.
- Avoid changing quote styles, indentation, ordering, or whitespace unrelated to the task.
- Do not create massive diffs for a small feature.

A small task should produce a small diff.

---

# 18. GIT / DIFF AWARENESS

Before finishing:

Review the changes you made.

Ask:

> "Did I change anything that was not required?"

If yes, revert those unnecessary changes.

The final diff should contain only changes relevant to the user's request.

Prefer:

**10 necessary lines changed**

over:

**200 lines changed because the code was cleaned up.**

---

# 19. WHEN YOU FIND UNRELATED PROBLEMS

If you discover an unrelated bug, code smell, outdated pattern, or possible improvement while working:

**Do not automatically fix it.**

Mention it to the user after completing the requested task if it is important.

Example:

> "I noticed an unrelated issue in `X`, but I left it unchanged because it isn't required for this task."

---

# 20. STOP CONDITION

Once the requested functionality is correctly implemented:

**STOP.**

Do not continue modifying the project looking for things to improve.

The task is complete when the user's requested outcome works.

---

# 21. PRIORITY ORDER

When deciding what to do, follow this priority:

1. User's explicit request
2. Existing project architecture and conventions
3. Existing functionality and behavior
4. Minimal implementation
5. Code quality improvements only when relevant

Never prioritize your own preferred architecture over the user's existing architecture unless explicitly requested.

---

# 22. FINAL RESPONSE

After completing the task, briefly report:

- What was changed.
- Which files were changed.
- Any important implementation detail.
- Any issue that prevented full completion.

Do not claim unrelated improvements.

If no other files needed modification, say so.

---

# GOLDEN RULE

> **DO NOT CHANGE WHAT YOU WERE NOT ASKED TO CHANGE.**

> **DO NOT RENAME WHAT YOU WERE NOT ASKED TO RENAME.**

> **DO NOT REFACTOR WHAT YOU WERE NOT ASKED TO REFACTOR.**

> **DO NOT IMPROVE WHAT YOU WERE NOT ASKED TO IMPROVE.**

> **UNDERSTAND FIRST. CHANGE SECOND. VERIFY THIRD.**

The best implementation is not the one that changes the most code.

**The best implementation is the smallest correct change that fully satisfies the user's request.**
