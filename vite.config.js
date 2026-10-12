import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

const CLOUDINARY_ORIGIN = 'https://res.cloudinary.com/djyb4mzzk/image/upload'

function localizeCloudinaryAssets() {
  return {
    name: 'localize-cloudinary-assets',
    enforce: 'pre',
    transform(code, id) {
      if (!id.includes('/src/') || !code.includes(CLOUDINARY_ORIGIN)) return null
      return {
        code: code.split(CLOUDINARY_ORIGIN).join('/media/cloudinary'),
        map: null,
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    localizeCloudinaryAssets(),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
})
