import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'sbcef', // 다른 프로젝트에서 이 모듈을 참조할 때 사용될 고유한 이름
      filename: 'remoteEntry.js',
      // 다른 프로젝트에 노출할 컴포넌트나 모듈, 경로
      exposes: {
        './Remote1Component': './src/Remote1Component.jsx',
      },
      //shared: ['react', 'react-dom'], // 공통으로 사용할 라이브러리, 공유 라이브러리 중복 다운로드 방지 
       shared: {
        'react': {
          singleton: true,
          requiredVersion: '^18.0.0' // 또는 현재 React 버전
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.0.0'
        }
      }
    })
  ],
  server: {
    port: 5100,
    // CORS 헤더를 추가하는 설정, 출처 간 리소스 공유 허용
    headers: {
      'Access-Control-Allow-Origin': '*', // 모든 출처 허용
    },
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})
