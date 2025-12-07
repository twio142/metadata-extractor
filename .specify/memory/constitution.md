<!--
---
- Version change: N/A → 1.0.0
- List of modified principles:
  - [PRINCIPLE_1_NAME] → I. Metadata Extraction Core
  - [PRINCIPLE_2_NAME] → II. JSON as the Standard
  - [PRINCIPLE_3_NAME] → III. Reliability and Accuracy
  - [PRINCIPLE_4_NAME] → IV. Extensibility
  - [PRINCIPLE_5_NAME] → V. Performance
- Added sections:
  - Technology Stack
  - Development Workflow
- Removed sections: N/A
- Templates requiring updates:
  - ✅ .specify/templates/plan-template.md
  - ✅ .specify/templates/spec-template.md
  - ✅ .specify/templates/tasks-template.md
- Follow-up TODOs: None
-->
# Obsidian Metadata Extractor Fork Constitution

## Core Principles

### I. Metadata Extraction Core
The primary function of this plugin is to reliably extract metadata from notes within an Obsidian vault. This includes, but is not limited to, frontmatter, tags, links, and other structured data present in the notes.

### II. JSON as the Standard
All extracted metadata MUST be stored in well-structured JSON files. This ensures that external tools can easily and consistently access the information. The JSON schema SHOULD be documented and maintained.

### III. Reliability and Accuracy
The extracted metadata MUST be an accurate representation of the data within the Obsidian vault. The plugin MUST be robust against file changes, deletions, and other vault operations. A comprehensive test suite IS REQUIRED to ensure this principle is met.

### IV. Extensibility
The plugin architecture SHOULD be designed to be extensible. It should be straightforward to add new metadata sources or modify existing ones without requiring a full rewrite of the core logic.

### V. Performance
The plugin MUST be performant and have a minimal impact on the Obsidian user experience, even in very large vaults. Caching and efficient file processing are key considerations.

## Technology Stack

The plugin is built using TypeScript and runs within the Obsidian plugin environment. All code MUST adhere to the project's established linting and formatting rules.

## Development Workflow

All new features and bug fixes MUST be developed in a separate branch and submitted as a pull request. All pull requests MUST be reviewed by at least one other contributor before being merged. All code MUST be accompanied by relevant tests.

## Governance

This constitution is the guiding document for the project. All development and contributions MUST adhere to these principles. Amendments to this constitution require a pull request and approval from the project maintainers.

**Version**: 1.0.0 | **Ratified**: 2025-12-07 | **Last Amended**: 2025-12-07