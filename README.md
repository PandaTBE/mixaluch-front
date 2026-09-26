This is a [Next.js](https://nextjs.org/) project bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Catalog search

Both search fields share a draft; three or more trimmed characters trigger search after 400 ms. Enter and submit search
immediately, including shorter terms. Clearing the field resets the search. `nuqs` keeps the committed search, category
and page in the URL; search replaces history and resets the page. Changing category clears the search.

The project still uses Next 12. `next.config.js` aliases the `next/compat/router.js` export needed by the standard
`nuqs` Pages adapter and bundles nuqs during SSR so that the alias also applies on the server. The optional Next peer
override is intentional. Remove these compatibility settings when upgrading to a version supported by nuqs; do not
replace its adapter with a copy, which would lose navigation/queue handling. TypeScript 5 is required by nuqs
declarations.

Regression check: run `tests/catalog-search.browser.js` with Playwright MCP `browser_run_code_unsafe` using its
`filename` argument, with the frontend on port 3000 and the local production snapshot backend on port 8000. It checks
synchronized search, SPA submission, debounce, pagination reset, category search reset, Back/Forward, delayed responses,
navigation cancellation and mobile layout without creating orders. Run `npm run build` separately with the dev server
stopped.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on
[http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as
[API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Page loading

`usePageLoading` takes the pending URL from Next router events. Full page transitions use the destination skeleton;
query-only updates keep the existing content with a loading status. Shallow/hash changes do not replace content.
Completion/error events only clear the matching pending URL. Navigation links do not need Redux actions.

Skeletons reuse page/card layout styles and their breakpoints. Keep those shared wrappers when changing page layouts;
static informational pages render their already available content. Unknown destinations retain the outgoing page with
the loading status. Profile and order history also have local data-loading placeholders.

Run `node --test tests/page-loading.cjs` for event/cancellation regression tests. Run `tests/page-loading.browser.js`
with Playwright MCP `browser_run_code_unsafe` (`filename`) against the local frontend/backend for delayed navigation,
responsive geometry, overflow, query updates and cancellation checks. No forms or orders are submitted.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions
are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the
[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
