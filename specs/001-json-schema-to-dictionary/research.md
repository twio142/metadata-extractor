# Research: JSON Schema to Dictionary

## Decision: Confirm Existing Technology Stack

-   **Language**: TypeScript (targeting ES2018)
-   **Framework**: Obsidian Plugin API
-   **Testing**: Jest

## Rationale

The project is an existing Obsidian plugin, so the technology stack is well-defined. The proposed changes will be implemented within this existing stack. No new technologies are required.

The core of the work involves changing data structures (`Array` to `Object`) and updating the logic that processes this data in `src/methods.ts` and `src/workers/metadata.worker.ts`. This is a standard refactoring task and does not require external libraries.

## Testing Strategy Decision

Due to complexities in setting up a comprehensive testing environment for functions interacting with `fs` and Web Workers in a Node.js context, the testing scope for this phase will be **limited**. New tests will only cover utility functions that are as easily testable as `getAllExceptMd`, which primarily involves data transformation without side effects on the filesystem or direct Web Worker interaction. Functions that perform `fs.writeFileSync` or directly instantiate `Worker` will not be covered by new dedicated tests in this phase.

This pragmatic decision allows the core schema change to proceed without being blocked by intricate testing environment setup challenges that exceed the scope of this feature.

## Alternatives Considered

None. The task is a refactoring of an existing implementation, so introducing new technologies would be unnecessary complexity. For testing, the pragmatic approach of using real `fs` for output with explicit cleanup was initially considered but deemed too complex for the current scope due to the intricacies of mocking the entire Obsidian API environment and Web Workers in a Node.js test runner. Therefore, the testing scope is being intentionally limited.
