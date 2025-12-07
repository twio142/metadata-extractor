# Tasks: JSON Schema to Dictionary

**Input**: Design documents from `/specs/001-json-schema-to-dictionary/`
**Prerequisites**: plan.md, spec.md, data-model.md

**Tests**: The spec implies that testing is required to ensure reliability and accuracy.

**Organization**: All tasks are part of a single user story for this refactoring effort.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root

---

## Phase 1: Foundational (Blocking Prerequisites)

**Purpose**: Update the core data structures.

- [ ] T001 [P] Review the existing implementation of the four JSON export functions in `src/methods.ts`.
- [ ] T002 [P] Review `src/workers/metadata.worker.ts` to understand the backlink generation logic.
- [ ] T003 Update the type definitions in `src/interfaces.ts` to reflect the new dictionary-based schema where necessary.

---

## Phase 2: User Story 1 - Efficient Metadata Lookup (Priority: P1) 🎯 MVP

**Goal**: Refactor all four JSON exports to use a dictionary schema instead of an array.

**Independent Test**: Generate the JSON files and verify their structure and content. Programmatically look up entries to ensure O(1) access.

### Tests for User Story 1 ⚠️

> **NOTE: Update tests to assert the new schema. Ensure they FAIL before implementation is complete.**

- [ ] T004 [US1] Update tests in `tests/methods.test.ts` to check for a dictionary structure for the `metadata.json` export.
- [ ] T005 [P] [US1] Add or update tests in `tests/methods.test.ts` for `tags.json`, `canvas.json`, and `allExceptMd.json` to assert the new dictionary schema.

### Implementation for User Story 1

- [ ] T006 [US1] Modify the `writeCacheToJSON` function in `src/methods.ts` to build a dictionary for `metadata.json` keyed by `relativePath`.
- [ ] T007 [US1] Update the web worker at `src/workers/metadata.worker.ts` to accept and process the dictionary from `writeCacheToJSON` and return the modified dictionary.
- [ ] T008 [P] [US1] Modify the `writeTagsToJSON` function in `src/methods.ts` to build a dictionary for `tags.json` keyed by tag name.
- [ ] T009 [P] [US1] Modify the `writeCanvases` function in `src/methods.ts` to build a dictionary for `canvas.json` keyed by `relativePath`.
- [ ] T010 [P] [US1] Modify the `writeAllExceptMd` function in `src/methods.ts` to build a dictionary for `allExceptMd.json` keyed by `relativePath`.

---

## Phase 3: Polish & Cross-Cutting Concerns

**Purpose**: Final documentation and cleanup.

- [ ] T011 [P] Update the `README.md` to document the new JSON schema for all four exports, including code examples.
- [ ] T012 [P] Update the `CHANGELOG.md` to include a "Breaking Change" notice about the new JSON schema.
- [ ] T013 Run all tests to ensure the refactoring is complete and correct.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Foundational (Phase 1)**: Can start immediately.
- **User Story 1 (Phase 2)**: Depends on Foundational phase completion. Test tasks (T004, T005) should be addressed before or in parallel with implementation tasks.
- **Polish (Phase 3)**: Depends on User Story 1 completion.

### Within User Story 1

- The test updates (T004, T005) can be done in parallel with the implementation tasks.
- The implementation tasks for each JSON file (T008, T009, T010) are independent and can be done in parallel, but `metadata.json` (T006, T007) is the most complex and should be prioritized.

## Implementation Strategy

### MVP First (User Story 1 Only)

1.  Complete Phase 1: Foundational.
2.  Complete Phase 2: User Story 1 (all tasks).
3.  Complete Phase 3: Polish.
4.  **STOP and VALIDATE**: Manually inspect the generated JSON files and run all tests to confirm the new schema is correct and all data is preserved.
