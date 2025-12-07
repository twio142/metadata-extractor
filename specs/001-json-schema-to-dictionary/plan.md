# Implementation Plan: JSON Schema to Dictionary

**Branch**: `001-json-schema-to-dictionary` | **Date**: 2025-12-07 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-json-schema-to-dictionary/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

This feature will refactor the data schema of all JSON exports from an array of objects to a dictionary, keyed by `relativePath` (or tag name for `tags.json`). This will improve data lookup performance for external tools from O(n) to O(1). The implementation will ensure proper testing of the output data structure by simulating the Obsidian environment and utilizing real filesystem operations for output verification.

## Technical Context

**Language/Version**: TypeScript (targeting es2018)
**Primary Dependencies**: Obsidian API
**Storage**: JSON files on the local filesystem
**Testing**: Jest. Tests will use the real Node.js `fs` module to create temporary output files and verify their content. Obsidian API methods will be mocked directly in the tests. The Web Worker will be mocked using Jest's module mocking capabilities.
**Target Platform**: Obsidian Desktop
**Project Type**: Single project (Obsidian plugin)
**Performance Goals**: Improve data lookup performance to O(1).
**Constraints**: This is a breaking change for consumers of the JSON files. The change should be clearly documented in the CHANGELOG.
**Scale/Scope**: Affects all four JSON exports: `metadata.json`, `tags.json`, `allExceptMd.json`, and `canvas.json`.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

*   **I. Metadata Extraction Core**: Pass. The feature is still about extracting metadata.
*   **II. JSON as the Standard**: Pass. The output is still JSON, just a different structure.
*   **III. Reliability and Accuracy**: Pass. The data will be the same, just structured differently. Tests are crucial and will verify this.
*   **IV. Extensibility**: Pass. This change makes the data more extensible and easier to query.
*   **V. Performance**: Pass. This change is motivated by performance improvements.

## Project Structure

### Documentation (this feature)

```text
specs/001-json-schema-to-dictionary/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
src/
├── methods.ts
├── workers/
│   └── metadata.worker.ts
└── interfaces.ts

tests/
├── methods.test.ts # Updated to include tests for write operations.
├── methods.test.json # Input data for tests.
└── <new-test-data-files>.json # New input data files for write tests.
```

**Structure Decision**: The changes will be contained within the existing `src` and `tests` directories. No new files are anticipated, only modifications to existing ones.

## Complexity Tracking

No violations.
