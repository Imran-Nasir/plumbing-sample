#!/usr/bin/env node
/**
 * FlowPro Plumbing Website — Apply Real Unsplash Photos to Figma
 *
 * HOW TO USE:
 *   1. npm install node-fetch@2   (or: npm install axios)
 *   2. node apply-real-images.js
 *   3. Copy the generated figma-plugin-script.js into the Figma console:
 *      In Figma → Plugins → Development → Open Console → paste & run
 *
 * The script downloads 20 real plumbing-relevant photos from Unsplash,
 * base64-encodes them, and produces a ready-to-paste Figma plugin script
 * that sets IMAGE fills on every placeholder frame.
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// ─── Photo mapping ────────────────────────────────────────────────────────────
// Each entry: [nodeId, width, height, unsplashPhotoId, description]
const IMAGES = [
  // Hero bento — plumber at work
  ['61:5',   368, 540,  '1558618666-fcd25c85cd64', 'plumber-hero'],
  // Home bento — copper pipes close-up
  ['42:43',  252, 262,  '1504328345606-18bbc8c9d7d1', 'copper-pipes'],
  // Home bento — modern bathroom
  ['42:48',  252, 262,  '1552321554-5fefe8c9ef14', 'bathroom'],
  // Home — city aerial / service area map teaser
  ['50:75',  960, 400,  '1477959858617-67f85cf4f1df', 'city-aerial'],
  // Home blog cards
  ['50:85',  365, 160,  '1584622650111-993a426fbf0a', 'blog-toilet'],
  ['50:92',  365, 160,  '1504328345606-18bbc8c9d7d1', 'blog-drain'],
  ['50:99',  365, 160,  '1581093458791-9d42e3c2fd45', 'blog-waterheater'],
  // About — founder portrait
  ['54:23',  400, 480,  '1507003211169-0a1dd7228f2d', 'portrait-founder'],
  // About — team members
  ['54:53',  257, 220,  '1500648767791-00dcc994a43e', 'team-marcus'],
  ['54:59',  257, 220,  '1494790108377-be9c29b29330', 'team-diana'],
  ['54:65',  257, 220,  '1506794778202-cad84cf45f1d', 'team-joel'],
  ['54:71',  257, 220,  '1438761681033-6461ffad8d80', 'team-ana'],
  // Blog — featured article (pipes close-up)
  ['59:22',  640, 400,  '1581094288338-2314dddb7ece', 'blog-featured-pipes'],
  // Blog cards
  ['59:36',  413, 160,  '1584622650111-993a426fbf0a', 'blogcard-toilet'],
  ['59:44',  413, 160,  '1504328345606-18bbc8c9d7d1', 'blogcard-drain'],
  ['59:52',  413, 160,  '1581093458791-9d42e3c2fd45', 'blogcard-heater'],
  ['59:60',  413, 160,  '1571165175449-4a0e3bcd8973', 'blogcard-pipes-repair'],
  ['59:68',  413, 160,  '1548613053-22087dd8edb8', 'blogcard-winter'],
  ['59:76',  413, 160,  '1504328345606-18bbc8c9d7d1', 'blogcard-drain2'],
  // Service areas — full city map
  ['59:109', 800, 560,  '1480714378408-67cf0d13bc1b', 'service-areas-map'],
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function download(url) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    const mod = url.startsWith('https') ? https : http;
    const req = mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // follow redirect
        download(res.headers.location).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });
    req.on('error', reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

function unsplashUrl(photoId, w, h) {
  // Use Unsplash CDN directly (no API key needed for image URLs)
  return `https://images.unsplash.com/photo-${photoId}?w=${w}&h=${h}&fit=crop&crop=center&auto=format&q=80`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const tmpDir = path.join(__dirname, '.tmp-images');
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

  const results = [];

  for (const [nodeId, w, h, photoId, label] of IMAGES) {
    const url = unsplashUrl(photoId, w, h);
    const cachePath = path.join(tmpDir, `${label}.jpg`);

    let buf;
    if (fs.existsSync(cachePath)) {
      console.log(`  [cache] ${label}`);
      buf = fs.readFileSync(cachePath);
    } else {
      process.stdout.write(`  [dl]    ${label} ... `);
      try {
        buf = await download(url);
        fs.writeFileSync(cachePath, buf);
        console.log(`${buf.length} bytes`);
      } catch (e) {
        console.log(`FAILED: ${e.message}`);
        // Try a fallback Unsplash photo for the same category
        const fallback = `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=${w}&h=${h}&fit=crop&auto=format&q=80`;
        try {
          buf = await download(fallback);
          fs.writeFileSync(cachePath, buf);
          console.log(`  [dl]    ${label} fallback OK, ${buf.length} bytes`);
        } catch(e2) {
          console.log(`  [SKIP]  ${label} - both attempts failed`);
          continue;
        }
      }
    }

    const b64 = buf.toString('base64');
    results.push({ nodeId, b64, label });
    console.log(`  [b64]   ${label} → ${b64.length} chars`);
  }

  // ─── Generate Figma plugin script ───────────────────────────────────────────
  const imageMap = results.map(r => `  '${r.nodeId}': '${r.b64}'`).join(',\n');

  const pluginScript = `// FlowPro — Apply Real Unsplash Photos
// Paste this entire script into the Figma console and press Enter.
// Plugins → Development → Open Console

(async () => {
  function b64d(s) {
    const m = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    const l = s.replace(/=+$/, '');
    const out = new Uint8Array(Math.floor(l.length * 3 / 4));
    let i = 0, j = 0;
    while (i < l.length) {
      const a = m.indexOf(l[i++]), b = m.indexOf(l[i++]);
      const c = i < l.length && l[i] !== '=' ? m.indexOf(l[i++]) : -1;
      const d = i < l.length && l[i] !== '=' ? m.indexOf(l[i++]) : -1;
      out[j++] = (a << 2) | (b >> 4);
      if (c !== -1) out[j++] = ((b & 0xf) << 4) | (c >> 2);
      if (d !== -1) out[j++] = ((c & 3) << 6) | d;
    }
    return out.slice(0, j);
  }

  const images = {
${imageMap}
  };

  let applied = 0, skipped = 0;
  for (const [nodeId, b64] of Object.entries(images)) {
    const node = figma.getNodeById(nodeId);
    if (!node) { console.warn('Node not found:', nodeId); skipped++; continue; }
    try {
      const bytes = b64d(b64);
      const img = figma.createImage(bytes);
      node.fills = [{ type: 'IMAGE', imageHash: img.hash, scaleMode: 'FILL' }];
      applied++;
      console.log('✓', nodeId);
    } catch(e) {
      console.error('✗', nodeId, e.message);
      skipped++;
    }
  }
  figma.notify(\`✓ \${applied} photos applied, \${skipped} skipped\`);
  console.log('Done:', applied, 'applied,', skipped, 'skipped');
})();
`;

  const outPath = path.join(__dirname, 'figma-plugin-script.js');
  fs.writeFileSync(outPath, pluginScript);

  console.log('\n─────────────────────────────────────────────────');
  console.log(`✓  Generated ${outPath}`);
  console.log(`   Contains ${results.length} real Unsplash photos`);
  console.log('\nNEXT STEPS:');
  console.log('  1. Open your Figma file: https://www.figma.com/design/3uMo6sffWCWXxFTc3GGbtS/Plumbing');
  console.log('  2. Go to: Plugins → Development → Open Console');
  console.log('  3. Copy the contents of figma-plugin-script.js');
  console.log('  4. Paste into the console and press Enter');
  console.log('  5. Watch the toast "✓ 20 photos applied"');
  console.log('─────────────────────────────────────────────────\n');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
