# SuparCloud website and brand kit

A static, responsive website for suparcloud.io. Plain HTML and CSS; no client-side JavaScript, tracking, external font requests, or runtime framework.

## Contents
- `index.html`: purpose, principles, current project (SuparShip), and contribution links.
- `brand.html`: visual brand guide with individual logo downloads.
- `BRAND-GUIDE.md`: portable style guide, provenance, sizing, and usage rules.
- `assets/brand/`: outlined SVG masters, transparent PNGs, avatars, favicon exports, social artwork, and color tokens.
- `suparcloud-brand-kit.zip`: complete downloadable kit.
- `.github/workflows/pages.yml`: GitHub Pages deployment from `main`.

The current identity is reconstructed from the blue-and-purple cloud references supplied for this project. It is not the older logo in the separate delivery archive. See the provenance note in the brand guide. Product copy is grounded in the SuparShip README; no founding story, customer counts, or service offerings are assumed.

## Local preview
Requires Node.js 22 or newer. Runtime/deployment has no package dependencies.

```sh
npm run build
npm run preview
```

Open http://127.0.0.1:4173. The preview serves only `_site/` on localhost.

## Edit and regenerate
Edit homepage content in `index.html`, shared styles in `styles.css`, and brand-guide page content in `scripts/guide.mjs` (which writes `brand.html`). Edit vector geometry and exports in `scripts/brand.mjs`.

```sh
npm ci
npm run brand
npm run pack
npm run build
```

The archive command needs the standard `zip` utility. Commit the generated assets, guide, and archive with the source changes. CI stages prebuilt static files, so it does not install image/font-processing packages or regenerate artwork. Only the allowlisted web files and `assets/` are published; scripts, dependencies, and test artifacts are excluded.

## Validation
With the preview running in another terminal:

```sh
npm ci
npx playwright install chromium
npm test
```

Checks both pages at 320, 390, 768, and 1440px; horizontal overflow; broken local links and images; accessibility with axe WCAG A/AA rules; keyboard skip-link entry; in-page navigation; ZIP download; 404 response; PNG dimensions; and primary palette contrast. Screenshots are saved in ignored `artifacts/`. Automated checks complement visual inspection and do not prove complete WCAG conformance.

## GitHub Pages
The workflow deploys `_site/` on pushes to `main` and can also be run manually. In repository Settings → Pages, select **GitHub Actions** as the publishing source.

For the custom domain, set **suparcloud.io** in the repository Pages settings. `CNAME` is included for compatibility with branch-based hosting; GitHub Actions publishing ignores that file, so it does not configure the domain by itself.

At the DNS provider, point the apex (`@`) A records to:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Optionally point `www` by CNAME to `suparcloud.github.io`. Preserve unrelated mail and verification records. After the DNS check and certificate issuance succeed, enable **Enforce HTTPS**. As of the initial local verification, the apex points to `192.64.119.56` and uses registrar-servers.com nameservers; no DNS changes have been made by this project.

References: [GitHub custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [GitHub custom-domain configuration](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

## Licenses
Poppins is included under its SIL Open Font License in `assets/fonts/OFL.txt`. Brand artwork identifies SuparCloud; no transfer of trademark rights or blanket source-code license is implied.
