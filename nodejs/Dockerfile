# Node.js 공식 이미지 사용
FROM node:22-alpine

# 작업 디렉토리 설정
WORKDIR /app

# 애플리케이션 종속성 설치
COPY package*.json ./
RUN npm install

# 애플리케이션 소스 코드 복사
COPY . .

# PORT
EXPOSE 3000

# 애플리케이션 실행
CMD ["npm", "start"]
#CMD ["node", "src/app.js"]