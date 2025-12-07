# Feature Specification: JSON Schema to Dictionary

**Feature Branch**: `001-json-schema-to-dictionary`
**Created**: 2025-12-07
**Status**: Draft
**Input**: User description: "change the data schema of all json exports from an array of objects to a dictionary, keyed by `relativePath`."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Efficient Metadata Lookup (Priority: P1)

As a developer or user of a tool that consumes the exported JSON files, I want the data to be structured as a dictionary with `relativePath` as the key, so that I can directly and efficiently look up metadata for a specific file without having to iterate through an entire array.

**Why this priority**: This is the core of the feature request and provides a significant performance improvement for consumers of the exported data.

**Independent Test**: This can be tested by generating the JSON files and programmatically accessing a key to verify that the returned data is correct and the lookup is direct.

**Acceptance Scenarios**:

1.  **Given** the plugin has generated the `metadata.json` file, **When** I parse the file and access a key corresponding to a file's `relativePath`, **Then** the value returned is the correct metadata object for that file.
2.  **Given** the plugin has generated the `canvas.json` file, **When** I parse the file and access a key corresponding to a canvas file's `relativePath`, **Then** the value returned is the correct object for that canvas file.
3.  **Given** the plugin has generated the `tags.json` file, **When** I parse the file and access a key corresponding to a tag name, **Then** the value returned is the correct object containing the list of files with that tag.
4.  **Given** the vault is empty, **When** the JSON files are generated, **Then** each file contains an empty JSON object (`{}`).

### Edge Cases

-   How does the system handle file paths that contain characters that might be problematic in JSON keys? (Modern JSON handles UTF-8 keys, so this is low risk, but worth noting).
-   How does the system handle a vault with no markdown files, but other files? The `metadata.json` should be empty, but other JSON files might have content.

## Requirements *(mandatory)*

### Functional Requirements

-   **FR-001**: The `metadata.json` export MUST be a single JSON object where each key is a file's `relativePath` and the value is its corresponding metadata object.
-   **FR-002**: The `canvas.json` export MUST be a single JSON object where each key is a canvas file's `relativePath` and the value is its corresponding data object.
-   **FR-003**: The `tags.json` export MUST be a single JSON object where each key is a tag name (e.g., "#tagname") and the value is an object containing a list of `relativePaths` for files containing that tag.
-   **FR-004**: The `allExceptMd.json` export MUST be a single JSON object. The keys for files and folders should be their respective `relativePath`.
-   **FR-005**: The internal structure of the value objects (the metadata for a single file, tag, etc.) MUST NOT change.

## Key Entities *(include if feature involves data)*

-   **Metadata Dictionary**: A key-value store where the key is the `relativePath` (string) of a markdown file and the value is the comprehensive `Metadata` object for that file.
-   **Tag Dictionary**: A key-value store where the key is the tag name (string) and the value is an object containing an array of `relativePaths` of files associated with that tag.
-   **Canvas Dictionary**: A key-value store where the key is the `relativePath` (string) of a canvas file and the value is the data object for that canvas.
-   **All Files Dictionary**: A key-value store where the key is the `relativePath` (string) of a file or folder and the value contains its information.

## Success Criteria *(mandatory)*

### Measurable Outcomes

-   **SC-001**: Lookup time for a specific file's metadata in the generated JSON is constant (O(1)) with respect to the number of files in the vault.
-   **SC-002**: All four JSON exports (`metadata.json`, `tags.json`, `allExceptMd.json`, `canvas.json`) are generated successfully in the new dictionary format.
-   **SC-003**: The plugin's execution time to generate the files does not significantly increase.