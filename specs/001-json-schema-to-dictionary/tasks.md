# Tasks: JSON Schema to Dictionary

**Input**: Design documents from `/specs/001-json-schema-to-dictionary/`
**Prerequisites**: plan.md, spec.md, data-model.md, research.md, quickstart.md

**Tests**: The spec implies that testing is required to ensure reliability and accuracy. The testing strategy is detailed in research.md.

**Organization**: All tasks are part of a single user story for this refactoring effort.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root

---

## Phase 1: Foundational (Blocking Prerequisites)

**Purpose**: Prepare the testing environment and core data structures.

- [ ] T001 [P] Review the existing implementation of the four JSON export functions in `src/methods.ts`.
- [ ] T002 [P] Review `src/workers/metadata.worker.ts` to understand the backlink generation logic.
- [ ] T003 Update the type definitions in `src/interfaces.ts` if necessary.

### Test Setup

- [ ] T004 Create `tests/canvases.test.json` with mock data for canvas files.
- [ ] T005 Create `tests/tags.test.json` with mock data for tags.
- [ ] T006 Create `tests/allExceptMd.test.json` with mock data for non-Markdown files and folders.
- [ ] T007 Create `tests/cache.test.json` with mock data for Markdown file metadata.
- [ ] T008 Add `// @ts-nocheck` to `tests/methods.test.ts` to temporarily bypass type errors during development.
- [ ] T009 In `tests/methods.test.ts`, add mock implementation for `Worker` class.
- [ ] T010 In `tests/methods.test.ts`, add `beforeAll` hook to create a temporary test vault directory (e.g., `temp-vault`) using `fs.mkdirSync`.
- [ ] T011 In `tests/methods.test.ts`, add `afterAll` hook to clean up the temporary test vault directory using `fs.rmSync`.
- [ ] T012 In `tests/methods.test.ts`, add `beforeEach` hook to reset mocks, set up mock `App` object with its `vault` and `metadataCache` methods, and configure plugin settings to point to the temporary vault path.
- [ ] T013 Update the existing `getAllExceptMd` test in `tests/methods.test.ts` to use `jest.requireActual('fs').readFileSync` for input data and verify against snapshot.

---

## Phase 2: User Story 1 - Efficient Metadata Lookup (Priority: P1) 🎯 MVP

**Goal**: Refactor all four JSON exports to use a dictionary schema instead of an array, and ensure they are correctly tested.

**Independent Test**: Generate the JSON files and verify their structure and content. Programmatically look up entries to ensure O(1) access.

### Implementation Tasks

- [ ] T014 Modify the `getAll` function in `src/methods.ts` to check `children` or `extension` instead of `instanceof` for robustness with mock objects.
- [ ] T015 Modify the `writeCanvases` function in `src/methods.ts` to build a dictionary and update its `instanceof` check.
- [ ] T016 Modify the `writeAllExceptMd` function in `src/methods.ts` to build a dictionary and update `src/utils.ts` to reflect the new return type.
- [ ] T017 Modify the `writeTagsToJSON` function in `src/methods.ts` to build a dictionary for `tags.json` keyed by tag name.
- [ ] T018 Modify the `writeCacheToJSON` function in `src/methods.ts` to build a dictionary for `metadata.json` keyed by `relativePath` and fix the `Worker()` call to `new Worker()`.
- [ ] T019 Update `src/workers/metadata.worker.ts` to process the dictionary data structure for backlink calculation.

### Testing Tasks

- [ ] T020 Add test for `writeCanvases` in `tests/methods.test.ts`. This test should load mock data from `canvases.test.json`, mock `app.vault.getAllLoadedFiles` to return this data, call `methods.writeCanvases`, read the output file from `tempVaultPath`, and assert its content against a snapshot.
- [ ] T021 Add test for `writeTagsToJSON` in `tests/methods.test.ts`. This test should load mock data from `tags.test.json`, mock `app.vault.getMarkdownFiles` and `app.metadataCache.getFileCache`, call `methods.writeTagsToJSON`, read the output file, and assert its content against a snapshot.
- [ ] T022 Add test for `writeAllExceptMd` in `tests/methods.test.ts`. This test should load mock data from `allExceptMd.test.json`, mock `app.vault.getAllLoadedFiles`, call `methods.writeAllExceptMd`, read the output file, and assert its content against a snapshot.
- [ ] T023 Add test for `writeCacheToJSON` in `tests/methods.test.ts`. This test should load mock data from `cache.test.json`, mock `app.vault.getMarkdownFiles` and `app.metadataCache.getFileCache`, call `methods.writeCacheToJSON`, manually trigger the mock worker's `onmessage`, read the output file, and assert its content against a snapshot.

---

## Phase 3: Polish & Cross-Cutting Concerns

**Purpose**: Final documentation and cleanup.

- [ ] T024 [P] Update the `README.md` to document the new JSON schema for all four exports, including code examples.
- [ ] T025 [P] Update the `CHANGELOG.md` to include a "Breaking Change" notice about the new JSON schema.
- [ ] T026 Run all tests to ensure the refactoring is complete and correct.
- [ ] T027 Remove `// @ts-nocheck` from `tests/methods.test.ts` and fix any remaining TypeScript issues.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Foundational (Phase 1)**: Can start immediately. Test Setup tasks (T004-T013) should be completed before Implementation Tasks in Phase 2.
- **User Story 1 (Phase 2)**: Depends on Foundational phase completion. Implementation Tasks (T014-T019) should be addressed before or in parallel with Testing Tasks (T020-T023).
- **Polish (Phase 3)**: Depends on User Story 1 completion.

### Within User Story 1

- The Implementation Tasks (T014-T019) can be tackled in any order, though completing a function's implementation before writing its test is recommended.
- The Testing Tasks (T020-T023) should follow the completion of their corresponding implementation.

## Implementation Strategy

### MVP First (User Story 1 Only)

1.  Complete Phase 1: Foundational (including Test Setup).
2.  Complete Phase 2: User Story 1 (all Implementation and Testing tasks).
3.  Complete Phase 3: Polish.
4.  **STOP and VALIDATE**: Manually inspect the generated JSON files and run all tests to confirm the new schema is correct and all data is preserved.