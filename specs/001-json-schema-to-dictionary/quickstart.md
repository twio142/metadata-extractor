# Quickstart: Using the New JSON Schema

This guide explains how to access data from the exported JSON files, which now use a dictionary-based schema for efficient data lookup.

## Accessing Metadata for a Specific File (`metadata.json`)

To get the comprehensive metadata for a specific Markdown file, you can now directly access it using the file's full `relativePath` as the key in the `metadata.json` file.

**Example (JavaScript):**

```javascript
const metadata = require('./metadata.json'); // Load the exported metadata.json

const filePath = 'path/to/my-note.md';
const myNoteMetadata = metadata[filePath];

if (myNoteMetadata) {
  console.log(`Metadata for ${filePath}:`, myNoteMetadata);
  console.log(`Tags for ${filePath}:`, myNoteMetadata.tags);
} else {
  console.log(`No metadata found for ${filePath}`);
}
```

## Finding Files with a Specific Tag (`tags.json`)

To find all files associated with a particular tag, you can use the tag name (including the `#` prefix, in lowercase) as the key in the `tags.json` file.

**Example (JavaScript):**

```javascript
const tagsData = require('./tags.json'); // Load the exported tags.json

const tagName = '#my-tag'; // Use the tag name as it appears in the keys
const tagInfo = tagsData[tagName];

if (tagInfo) {
  console.log(`Files with ${tagName}:`, tagInfo.relativePaths);
  console.log(`Number of notes with ${tagName}:`, tagInfo.tagCount);
} else {
  console.log(`Tag ${tagName} not found.`);
}
```

## Accessing Canvas File Information (`canvas.json`)

To retrieve information for a specific canvas file, use its full `relativePath` as the key in the `canvas.json` file.

**Example (JavaScript):**

```javascript
const canvasData = require('./canvas.json'); // Load the exported canvas.json

const canvasPath = 'path/to/my-diagram.canvas';
const myCanvasInfo = canvasData[canvasPath];

if (myCanvasInfo) {
  console.log(`Info for ${canvasPath}:`, myCanvasInfo);
  console.log(`Basename:`, myCanvasInfo.basename);
} else {
  console.log(`Canvas file ${canvasPath} not found.`);
}
```

## Accessing All Files and Folders (Excluding Markdown) (`allExceptMd.json`)

To get information about non-Markdown files or folders, use their respective `relativePath` as the key in the `allExceptMd.json` file.

**Example (JavaScript):**

```javascript
const allExceptMdData = require('./allExceptMd.json'); // Load the exported allExceptMd.json

const imagePath = 'path/to/my-image.png';
const folderPath = 'path/to/my-folder';

const imageInfo = allExceptMdData[imagePath];
const folderInfo = allExceptMdData[folderPath];

if (imageInfo) {
  console.log(`Info for ${imagePath}:`, imageInfo);
}
if (folderInfo) {
  console.log(`Info for ${folderPath}:`, folderInfo);
}
```

## Summary of Changes

-   **Arrays are now Dictionaries:** All JSON exports are now objects (dictionaries) instead of arrays.
-   **Key-Based Lookup:** This allows for direct, key-based access to data, which is significantly faster than iterating through an array.
-   **`metadata.json`:** Keyed by the full `relativePath` of Markdown files.
-   **`tags.json`:** Keyed by the lowercase tag name (e.g., `#mytag`).
-   **`canvas.json`:** Keyed by the full `relativePath` of canvas files.
-   **`allExceptMd.json`:** Keyed by the full `relativePath` of non-Markdown files and folders.
