import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import fs from 'fs';

// Seed local image asset if missing in dev environment
try {
  const imageUrl = "https://storage.googleapis.com/makersuite-assets/project_attachments/1f57768b-2960-4006-91dc-0bcea32f7f58/Screenshot%202026-05-21%20121432.png";
  if (!fs.existsSync('public')) {
    fs.mkdirSync('public');
  }
  const publicDest = 'public/Screenshot 2026-05-21 121432.png';
  const rootDest = 'Screenshot 2026-05-21 121432.png';
  if (!fs.existsSync(publicDest) || !fs.existsSync(rootDest)) {
    fetch(imageUrl)
      .then(res => res.arrayBuffer())
      .then(buffer => {
        fs.writeFileSync(publicDest, Buffer.from(buffer));
        fs.writeFileSync(rootDest, Buffer.from(buffer));
      })
      .catch(() => {});
  }
} catch (e) {}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
