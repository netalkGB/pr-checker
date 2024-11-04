# GitHub PR Viewer

Simple command-line tool to view open pull requests and their changed files.

## Setup

1. Create GitHub Personal Access Token with following permissions:
   - `repo`

2. Set environment variable:
```bash
export GITHUB_TOKEN="your_token"
```

3. Configure repository settings in `main.js`:
```javascript
const owner = 'your-org-or-username';
const repo = 'your-repository-name';
```

## Usage

```bash
node main.js
```

## Output Example

```
====================
PR Number: 123
Title: Add new feature
Author: John Doe
URL: https://github.com/netalkGB/gb.netalk.io/pull/123

Changed Files:
- file1.js (modified)
  Additions: 10, Deletions: 5
====================
```
