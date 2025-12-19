# Repository Guidelines

## Project Structure & Modules

- Docusaurus site; entry config in `docusaurus.config.js`, navigation in `sidebars.json`.
- Content: versioned docs in `docs/` and `versioned_docs/`, blog posts in `blog/`, static assets in `static/`, and generated build artifacts in `build/`.
- UI code lives in `src/` (`components/`, `pages/`, `theme/`, `plugins/`, `store/`, `css/`); keep React components colocated with related data in `src/data/` when possible.
- Infrastructure: deployment profiles in `appsvc.yaml` and `staticwebapp.config.json`; tests are lightweight and mostly manual/type-based.

## Build, Test, and Development Commands

- `yarn start` (or `npm run start`): run local dev server with hot reload.
- `yarn build`: produce static site in `build/`; run before deployment to catch MDX/TypeScript issues.
- `yarn build:azure`: clear cache then build for Azure pipelines.
- `yarn typecheck`: TypeScript project-wide type safety.
- `yarn fmt` / `yarn fmt:check`: format or verify formatting via Prettier.
- `yarn clear`: remove cached Docusaurus artifacts; use if local build behaves unexpectedly.

## Coding Style & Naming Conventions

- Use Prettier defaults (2-space indent, single quotes as configured); run `yarn fmt` before pushing.
- Prefer TypeScript/TSX in `src/`; keep React components PascalCase (e.g., `HeroBanner.tsx`) and hooks camelCase (`useFeatureFlag`).
- MDX/Markdown files should start with frontmatter and use sentence-case headings; place images under `static/img/` and reference with relative paths.
- Keep copy and config near their consumers (e.g., component-specific data in `src/data/<feature>.ts`).

## Testing Guidelines

- No formal test suite; rely on `yarn typecheck`, `yarn fmt:check`, and `yarn build` as baseline gates.
- For content changes, open the dev server and manually verify navigation, code blocks, and external links (lychee config exists in `lychee.toml` if you run link checks locally).
- When modifying UI, verify responsive layout and dark/light modes where applicable.

## Commit & Pull Request Guidelines

- Follow the existing history pattern: concise subject with scope or ticket; prefer present tense and include issue/PR IDs when available.
- One logical change per commit; avoid bundling unrelated docs and feature updates together.
- PRs should include: summary of change, testing notes (commands run), screenshots or GIFs for visible UI changes, and links to related issues/tickets.
- Keep docs in sync with behavior (update `README.md`, `docs/`, or `versioned_docs/` when features change) and mention any new environment variables or config requirements.
- Use GitHub CLI to create a PR with the following tempate https://github.com/reductstore/.github/blob/main/.github/pull_request_template.md.

## Repository links

- Main Repo: https://github.com/reductstore/reductstore
- CLI: https://github.com/reductstore/reduct-cli
- Web Console: https://github.com/reductstore/web-console
- Python SDK: https://github.com/reductstore/reduct-py
- JavaScript SDK: https://github.com/reductstore/reduct-js
- Go SDK: https://github.com/reductstore/reduct-go
- Rust SDK: https://github.com/reductstore/reduct-rs
- C++ SDK: https://github.com/reductstore/reduct-cpp
