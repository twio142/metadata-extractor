# Quickstart: Using the New JSON Schema

This guide explains how to access data from the exported JSON files, which now use a dictionary-based schema for efficient data lookup.

## Accessing Metadata for a Specific File

To get the metadata for a specific file, you can now directly access it using the file's `relativePath` as the key in the `metadata.json` file.

**Example (JavaScript):**

```javascript
const metadata = require('./metadata.json');

const filePath = 'path/to/my-note.md';
const myNoteMetadata = metadata[filePath];

if (myNoteMetadata) {
  console.log(`Tags for ${filePath}:`, myNoteMetadata.tags);
} else {
  console.log(`No metadata found for ${filePath}`);
}
```

## Finding Files with a Specific Tag

To find all files with a specific tag, you can use the tag name as a key in the `tags.json` file.

**Example (JavaScript):**

```javascript
const tagsData = require('./tags.json');

const tagName = '#my-tag';
const tagInfo = tagsData[tagName];

if (tagInfo) {
  console.log(`Files with ${tagName}:`, tagInfo.relativePaths);
} else {
  console.log(`Tag ${tagName} not found.`);
}
```

## Summary of Changes

-   **Arrays are now Dictionaries:** All JSON exports are now objects (dictionaries) instead of arrays.
-   **Key-Based Lookup:** This allows for direct, key-based access to data, which is significantly faster than iterating through an array.
-   **`metadata.json`:** Keyed by `relativePath`.
-   **`tags.json`:** Keyed by tag name.
-   **`canvas.json`:** Keyed by `relativePath`.
-   **`allExceptMd.json`:** Keyed by `relativePath`.
