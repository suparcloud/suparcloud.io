# SuparCloud brand guide — v1.2

## Purpose and positioning
Build open-source tools that simplify cloud infrastructure and help small teams bring useful software into the world. Current project: SuparShip, a self-service application delivery platform for Kubernetes teams.

**Brand promise:** Less friction. More possibility.
**Supporting line:** Open tools. Your cloud.

Use SuparCloud in prose, SuparShip for the product, and lowercase only in designed wordmarks, domains, and repository names. Both horizontal and stacked logos pair the cloud symbol with the complete lowercase “suparcloud” wordmark, including the initial “s”. Keep a visible gap between symbol and lettering. The symbol never replaces a letter; use it alone for avatars and favicons.

## Logo provenance
The supplied blue-and-purple cloud screenshots are the visual reference. The cloud curves are reconstructed from those references. The rounded wordmark uses outlined Fredoka SemiBold, selected for soft terminals and curved letterforms. These are not original designer vector files or a pixel-exact trace. The older logo delivery archive contains a different identity and is excluded. Replace these masters with verified designer paths if they become available; preserve the filenames to avoid breaking site references.

## Color
| Token | sRGB hex | Role |
|---|---|---|
| Cloud blue | #1261F3 | Primary actions; upper symbol |
| Flow violet | #7850DA | Brand accents; lower symbol |
| Deep navy | #142747 | Headings; dark backgrounds |
| Cloud white | #F7F9FC | Supporting surfaces |
| Slate | #536178 | Secondary text on light surfaces |
| Mist | #DEE4EE | Decorative borders and dividers |
| White | #FFFFFF | Main background; reversed text |

These values standardize the new kit; they are not authoritative samples from compressed references. Aim for 70% white/pale surfaces, 20% navy/text, 10% accents. White text on Cloud blue and Flow violet passes WCAG AA normal-text contrast; navy and slate on white/Cloud white also pass. Do not use Mist as text or as the sole essential control boundary. Verify new combinations. Never communicate state through color alone. Screen assets are sRGB; proof colors separately for print.

## Typography and visual style
Fredoka SemiBold 600: rounded, outlined logo lettering. Poppins Bold 700: headlines. Both fonts and their SIL OFL licenses are included. Body: system sans-serif (-apple-system, BlinkMacSystemFont, Segoe UI, Arial, sans-serif). Body 16–18px with 1.65 line height; headlines 30–62px with 1.15–1.25 line height. Keep paragraphs around 55–75 characters. Use an 8px spacing rhythm; 8px button corners; 16–20px card corners. Keep generous whitespace, subtle dividers, and minimal effects. Visible focus, semantic links, and reduced-motion support are required.

## Logo usage
- Horizontal: navigation and wide placements; minimum width 140px.
- Stacked: centered, tall placements; minimum width 160px.
- Symbol: avatars and compact placements; minimum width 24px. Use the purpose-made favicon at 16px.
- Clear space: at least one quarter of the symbol height around every side of a lockup.
- `color`: full-color symbol and navy lettering on white or Cloud white.
- `reverse`: full-color symbol and white lettering on deep navy.
- `ink`: navy silhouette and lettering for one-color light-background uses.
- `white`: white silhouette and lettering on solid blue, violet, or dark backgrounds.
- Do not stretch, recolor, rearrange, crop, rotate, outline, or apply effects to official lockups. Place a solid panel over photography. Large standalone decorative marks on the site may use gentle rotation/shadow; never use that treatment as an official downloadable lockup.

## Export inventory
- SVG masters: horizontal, stacked, symbol, each in color/reverse/ink/white. Paths include outlined lettering; no external fonts required.
- Horizontal/stacked transparent PNGs: widths 320, 640, 1280, 2560px. Heights follow the original aspect ratio.
- Symbol transparent PNGs: widths 32, 64, 128, 256, 512, 1024px.
- Padded square avatars: light, dark, and blue, each 180, 192, 400, 512, 1024px. Suitable for GitHub and general social profiles; safe under circular cropping.
- Favicons: SVG, PNG at 16/32/48px, and multi-size ICO.
- Apple touch icon: 180 × 180px.
- Web manifest icons: 192 × 192px and 512 × 512px, standard (not maskable).
- Social sharing card: 1200 × 630px, SVG and PNG.

Platform sizes are practical defaults; check each upload screen for its own requirements. For new print sizes, prefer SVG.

## Voice
Useful, human, direct. Write as a builder helping another builder. Explain the problem and the concrete outcome. Avoid vague superlatives, invented company history, unsupported customer counts, guarantees, and claims of capabilities that do not exist.

Say: “Give every pull request a preview environment.”
Avoid: “Revolutionize your cloud journey with limitless innovation.”

## Rebuilding
From the site repository, run `npm ci` and `npm run brand` to regenerate masters, PNGs, and the web guide. Run `npm run pack` after any brand or style changes to refresh the downloadable archive, then `npm run build` to refresh the deployment output.

The kit is supplied for identifying SuparCloud. It does not grant trademark ownership or permission to imply endorsement. The included font retains its separate SIL Open Font License.
