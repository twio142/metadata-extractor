# Data Model: JSON Schema to Dictionary

This document describes the new data models for the JSON exports. The root of each JSON file will be an object (dictionary) instead of an array.

## `metadata.json`

The `metadata.json` file will be an object where each key is the `relativePath` of a markdown file and the value is the `Metadata` object for that file.

```typescript
// metadata.json
{
  "path/to/file1.md": {
    "fileName": "file1",
    "relativePath": "path/to/file1.md",
    "tags": ["#tag1", "#tag2"],
    "frontmatter": {
      // ...
    },
    // ... other metadata properties
  },
  "path/to/another/file2.md": {
    "fileName": "file2",
    "relativePath": "path/to/another/file2.md",
    // ...
  }
}
```

## `tags.json`

The `tags.json` file will be an object where each key is a tag name, and the value is an object containing the list of `relativePaths` for files containing that tag.

```typescript
// tags.json
{
  "#tag1": {
    "tagCount": 2,
    "relativePaths": ["path/to/file1.md", "path/to/file3.md"]
  },
  "#tag2": {
    "tagCount": 1,
    "relativePaths": ["path/to/file1.md"]
  }
}
```

## `canvas.json`

The `canvas.json` file will be an object where each key is the `relativePath` of a canvas file and the value is the data object for that canvas.

```typescript
// canvas.json
{
  "path/to/my_canvas.canvas": {
    "name": "my_canvas.canvas",
    "basename": "my_canvas",
    "relativePath": "path/to/my_canvas.canvas"
  }
}
```

## `allExceptMd.json`

The `allExceptMd.json` file will be an object where keys for files and folders are their respective `relativePath`.

```typescript
// allExceptMd.json
{
  "path/to/folder": {
    "name": "folder",
    "relativePath": "path/to/folder"
  },
  "path/to/image.png": {
    "name": "image.png",
    "basename": "image",
    "relativePath": "path/to/image.png"
  }
}
```
