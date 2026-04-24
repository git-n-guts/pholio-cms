# Schema Sync Convention — pholio-website & pholio-cms

Pholio uses a **two-repo architecture** for content management:

| | pholio-website | pholio-cms |
|---|---|---|
| **Purpose** | Static site (pholio.click) | CMS admin (admin.pholio.click) |
| **Schema file** | `src/content.config.ts` (Zod) | `keystatic.config.ts` (Keystatic) |
| **Runtime** | Build-time validation | CMS editing UI |
| **Hosting** | Cloudflare Pages (static) | Cloudflare Pages (SSR) |

## When to update schemas

Any time you add, rename, or modify a content field, you **must update both repos**:

1. Add the field to `keystatic.config.ts` in **pholio-cms** (for CMS editing UI)
2. Add the matching field to `src/content.config.ts` in **pholio-website** (for build-time validation)

If you only update one repo, content created via the CMS may fail build validation, or build validation may not catch CMS errors.

## Known acceptable gaps

These gaps are by design and do not need fixing:

| Field | pholio-website (Zod) | pholio-cms (Keystatic) | Reason |
|-------|----------------------|----------------------|--------|
| `content` (body) | Not defined | `fields.markdoc()` | Astro's glob loader parses the body automatically — no Zod field needed |
| `canonicalSlug` regex | `z.string().regex(/^[a-z0-9-]+$/)` | `fields.text()` (no regex) | Keystatic doesn't support regex validation — build-time Zod catches invalid slugs |
| Collections | 1 `questions` collection | 2 collections: `questionsEn`, `questionsVi` | Zod uses glob loader with `**/*.md`, Keystatic separates for bilingual editing UX |
| `cities.slug` | Check current schema | `fields.text()` | Ensure both repos agree on whether slug is in frontmatter or derived from filename |

## Checklist for schema changes

When adding a new field to a content collection:

- [ ] Add field to `keystatic.config.ts` in pholio-cms repo
- [ ] Add matching field to `src/content.config.ts` in pholio-website repo
- [ ] Verify field name, type, and validation match between both schemas
- [ ] Test: create content via CMS → verify build passes in pholio-website
- [ ] Update `docs/schema-sync.md` if the gap table needs updating

## Content creation flow

```
admin.pholio.click (pholio-cms)
  → Editor creates/edits content
  → Keystatic Cloud commits to pholio-website repo
  → Cloudflare Pages auto-deploys pholio.click
```

Content files (`.md`) live in the **pholio-website** repo. The CMS reads and writes them via Keystatic Cloud's GitHub integration.