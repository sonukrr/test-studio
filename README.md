# Zwayam

Generated from a Site Blueprint by Career Site Studio — version 8, project `243c778e-4dc6-4cd5-9910-b6b9a27f815c`.

An Angular 15 application, because the careers components are an Angular
library: job search, listings, filters, pagination and the application flow are
the real `zm-careers-lib` components, not imitations.

## This code is generated

Every file here except this README is written from `blueprint.json`. Change the
site in the studio and publish again; edits made directly in this repository are
overwritten by the next publish.

## Running it

```bash
npm install
npm start          # http://localhost:4200
npm run build      # -> dist/
```

## The careers tenant

`zm-careers-lib` identifies its tenant from the **hostname it is
served from** once that hostname is not `localhost`:
`CommonService.getDomain()` and `getCompanyUrl()` derive both from
`location.hostname`, and the values in `src/app/careers.config.ts` are only
consulted on localhost. The careers API answers an unrecognised domain with
`200` and no data, so left alone this site would render every component
correctly and list no jobs, with nothing on the console to say why.

`src/app/careers-tenant.interceptor.ts` prevents that: it rewrites `domain`
and `companyId` on every careers-API request to the values in
`careers.config.ts`. So this site shows the same roles wherever it is
deployed — which is what you want for a preview URL, and what you do not want
if this repository is ever reused for a different company.

Once the site is served from the careers domain itself (in Vercel, Settings ->
Domains), the library derives the same values on its own and the interceptor can
be deleted.

## Pages

| Page | Route |
| --- | --- |
| Home | `/` |
| Jobs | `/jobs` |
| Job details | `/jobs/:jobUrl` |

## Layout

- `src/app/pages/` — one component per blueprint page. The templates bind the
  library's real selectors and inputs.
- `src/app/section.component.*` — the presentation sections, ported from the
  studio preview so this site renders what the administrator approved.
- `src/styles/theme.css` — the brand's design tokens, the per-container layout
  rules with their mobile breakpoints, and any hand-authored replica CSS.
- `src/app/careers.config.ts` — the tenant identity, seeded into
  `sessionStorage` before Angular boots and pinned onto every request by
  `careers-tenant.interceptor.ts`.
- `src/assets/images/` — every image the site uses, copied out of the studio.

## Approved components on this site

- `FacetsComponent`
- `FilterChipsComponent`
- `FindYourSpotComponent`
- `JobViewComponent`
- `JobsListComponent`
- `PaginationComponent`
- `SearchComponent`
