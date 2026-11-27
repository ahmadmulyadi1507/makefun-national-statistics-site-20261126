// NusaData hand-in program (Node 22, standard library only).
//
// The site lives in app/ next to this file: plain static files a browser
// opens at app/index.html, with nothing fetched over the network. This
// program hands it in: it copies app/ and screenshots/ into the output
// directory and writes dossier.json there, the summary the judge reads
// (screenshots, first-load files and bytes, and the site's source), built
// with the make.fun library in vendor/makefun-frontend.ts. That vendor
// file is the kit's copy, unchanged: the scorer rebuilds the dossier with
// its own copy and requires the two to match byte for byte.
//
// Run it outside the grader with MAKEFUN_OUTPUT_DIR standing in for
// /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outDir, { recursive: true });
cpSync(join(repoRoot, 'app'), join(outDir, 'app'), { recursive: true });
mkdirSync(join(outDir, 'screenshots'), { recursive: true });
if (existsSync(join(repoRoot, 'screenshots'))) {
  cpSync(join(repoRoot, 'screenshots'), join(outDir, 'screenshots'), { recursive: true });
}

// The caps match the scorer's gate: at most 4 screenshots of 256 KiB, at
// most 993 files and 16 MiB under app/, and the dossier text at most
// 160 KiB. The program refuses an entry the scorer would refuse, so a
// failure here is a failure worth fixing before submitting.
writeFileSync(
  join(outDir, 'dossier.json'),
  buildDossier(outDir, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
