# Eleven Alpha Jerky

Vercel-ready Next.js website for Eleven Alpha Jerky.

## Replace the current GitHub website

1. Back up or download the current repository.
2. Remove the old website files from the repository.
3. Upload the contents of this package to the repository root. Do not upload the ZIP itself or the enclosing folder.
4. Commit the changes to the branch connected to Vercel, normally `main`.
5. Vercel should detect the commit and start a new deployment automatically.

## Vercel settings

- Framework preset: **Next.js**
- Build command: **Next.js default** (`next build`)
- Output directory: leave blank/default
- Install command: leave blank/default

No environment variables are required for the current email-based ordering workflow.

## Local development

```bash
npm install
npm run dev
```

Production verification:

```bash
npm run build
```
