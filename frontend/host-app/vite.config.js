// vite.config.js
import { defineConfig } from 'vite'
import federation from '@originjs/vite-plugin-federation'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'app',
      remotes: {
        // NGINX가 리버스 프록시 역할을 수행하므로, remote-app 경로를 NGINX 설정과 일치시켜야 합니다.
        remoteApp: 'http://localhost/remote-app/assets/remoteEntry.js',
      },
      shared: ['react','react-dom']
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})