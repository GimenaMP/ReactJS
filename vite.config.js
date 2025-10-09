import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// This configuration uses the official React plugin for Vite.  It handles
// JSX transformation and fast-refresh out of the box.  You can extend
// this file with additional options, such as aliasing, environment
// variables or custom build settings.  See the Vite docs for more details:
// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  build: {
    // Output directory for the production build.  IntelliJ IDEA will
    // automatically detect this when serving or running your React app.
    outDir: 'dist'
  }
});