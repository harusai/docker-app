// vite.config.js
import { defineConfig } from 'vite'
import federation from '@originjs/vite-plugin-federation'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'sbcom', // 호스트 애플리케이션의 이름
      filename: 'remoteEntry.js',
      remotes: {
        // NGINX가 리버스 프록시 역할을 수행하므로, sbcef 경로를 NGINX 설정과 일치시켜야 합니다.
        // 프로젝트가 빌드된 후 제공하는 엔트리 파일의 경로를 가리키도록 설정
        sbcef: '/sbcef/assets/remoteEntry.js', // 이 줄을 변경하세요.
      },
      //shared: ['react','react-dom']
       shared: {
        'react': {
          singleton: true,
          requiredVersion: '^18.0.17' // 또는 현재 React 버전
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.0.17'
        }
      }
    })
  ],
  server: {
    port: 5000,
    // CORS 헤더를 추가하는 설정, 출처 간 리소스 공유 허용
    headers: {
      'Access-Control-Allow-Origin': '*', // 모든 출처 허용
    },
    // /sbcef 경로로 들어오는 모든 요청을 Docker 네트워크 내의 mfe-sbcef 서비스로 전달
    proxy: {
      '/sbcef': 'http://mfe-sbcef:80'
    }
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    base: '/sbcom/', // 빌드된 파일이 제공될 기본 경로 설정, Vite는 모든 자원 파일 경로를 /sbcom/assets/와 같이 올바르게 생성
  }
})