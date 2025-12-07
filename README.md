# Metadata Extractor Obsidian plugin

This plugin allows you to write Obsidian vault metadata, which is only accessible via plugin, onto the hard drive. This enables Third-party apps to access Obsidian metadata which they normally wouldn't be able to access. Exemplary use cases are launcher apps (e.g. Alfred, Ulauncher) or graph analysis software.

See [this guide](https://github.com/kometenstaub/metadata-extractor/blob/main/docs/Guide%20-%20Controlling%20Obsidian%20via%20Third-Party-App.md) for more information on Controlling Obsidian via a Third-party App.

## There are four JSON-exports

They can be executed on a schedule. All exports are now dictionary-based for efficient lookup.

### Tag export (`tags.json`)

This export writes a JSON file where each key is a tag name, and the value is an object containing the tag count and corresponding file paths.

Example:

```json
{
	"#css-themes": {
		"tagCount": 1,
		"relativePaths": ["Advanced topics/Contributing to Obsidian.md"]
	},
	"#insider-build": {
		"tagCount": 1,
		"relativePaths": ["Advanced topics/Insider builds.md"]
	},
	"#anothertag": {
		"tagCount": 2,
		"relativePaths": [
			"Plugins/Zettelkasten prefixer.md",
			"Advanced topics/Using obsidian URI.md"
		]
	}
}
```

TypeScript interface for each entry (value):

```ts
/**
 * JSON export entry for a single tag
 */
interface TagEntry {
	tagCount: number;
	relativePaths: string[];
};
```

### Markdown notes metadata export (`metadata.json`)

This export writes a JSON file where each key is the `relativePath` of a Markdown file, and the value is its comprehensive metadata object.

```ts
/**
 * JSON export: Metadata object for a single file
 */
import {extendedFrontMatterCache} from "./interfaces";

interface Metadata {
	fileName: string;
	relativePath: string;
	tags?: string[];
	headings?: { heading: string; level: number }[];
	aliases?: string[];
	links?: links[];
	backlinks?: backlinks[];
	frontmatter?: extendedFrontMatterCache;
}

interface links {
	link: string;
	relativePath?: string;
	cleanLink?: string;
	displayText?: string;
}

interface backlinks {
	fileName: string;
	link: string;
	relativePath: string;
	cleanLink?: string;
	displayText?: string;
}

interface extendedFrontMatterCache {
	cssclass?: string;
	publish?: boolean;
	position: Pos; // Pos is from the Obsidian API
	[key: string]: any;
}
```

The exported object contains `Metadata` objects, one object for each Markdown file in your vault, keyed by its `relativePath`.

All objects have a `fileName` and a `relativePath`. `fileName` doesn't contain the `.md` extension, `relativePath` is the path from your vault root.

If a file has tags, the object has a `tags` property that contains an array of tags. Tags are all lower-cased and if a tag appears more than one time in a file, it will only appear one time in `tags`. If a file has any frontmatter it is included in `frontmatter`. The structure of the object depends on your frontmatter.

`aliases`, `links` and `backlinks` also only exist if there are any of the in a file.

#### `links` interface

The `links` contain both links to existing and non-existing files. If a file doesn't exist, the `links` won't have a `relativePath`.

`link` is the full link, exluding anything after the `|`, so if no alias is set, it also contains `#` or `#^` if there are headings or block references. If that is the case, there is also the `cleanLink` property which provides just the filename for the link (omitting the `.md` extension).

`displayText` is what is displayed by Obsidian in preview mode. It can be the alias, but also the file name if there is a heading or block reference. If it is a heading link or block reference to the same file, it excludes the `#`, just like Obsidian does in preview mode.

`cleanLink` and `displayText` don't exist if it is a normal link.

#### `backlinks` interface

Backlinks always have a `relativePath` property because the file linking to the current file (object) needs to exist.

`fileName` and `relativePath` are the file which contains the backlink.

`link`, `cleanLink` and `displayText` behave as [the links interface](#links-interface)


### Non-Markdown files metadata export (`allExceptMd.json`)

This export writes a JSON file where each key is the `relativePath` of a non-Markdown file or folder, and the value is its corresponding file/folder object.

```json
{
  "folder/subfolder": {
    "name": "subfolder",
    "relativePath": "folder/subfolder"
  },
  "images/photo.png": {
    "name": "photo.png",
    "basename": "photo",
    "relativePath": "images/photo.png"
  }
}
```

#### `file` and `folder` interfaces (used as values)

The `file` object contains `name` (including extension), `basename` (excluding extension), and `relativePath` (from vault root). The `folder` object contains `name` and `relativePath`.


### Canvas metadata export (`canvas.json`)

This export writes a JSON file where each key is the `relativePath` of a canvas file, and the value is its data object.

```json
{
  "Inbox/my-canvas.canvas": {
    "name": "my-canvas.canvas",
    "basename": "my-canvas",
    "relativePath": "Inbox/my-canvas.canvas"
  },
  "visualisation.canvas": {
    "name": "visualisation.canvas",
    "basename": "visualisation",
    "relativePath": "visualisation.canvas"
  }
}
```


## Configuration

If you don't touch any settings, the files will be saved to the plugin folder. You can configure their names in the settings.

You can however also specify absolute paths for each file. They need to include the file name and extension in this case. The setting above won't have any effect then.

You can also set the frequency for writing the JSON files in minutes (default setting is 0, so it is not enabled) and whether the JSON files should be written on launch (default setting is false).
