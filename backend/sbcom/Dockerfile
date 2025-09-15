# Node.js 공식 이미지 사용
FROM node:22-alpine

# OpenSSL 설치(Prisma 사용을 위해 필요)
RUN apk add --no-cache openssl
# PostgreSQL 클라이언트 설치
RUN apk add --no-cache postgresql-client

# 작업 디렉토리 설정
WORKDIR /app

# 애플리케이션 종속성 설치에 필요한 파일만 먼저 복사
COPY package.json .
COPY package-lock.json .
RUN npm install

# Prisma 스키마 및 소스 코드 복사
COPY prisma ./prisma
COPY src ./src

# 빌드 인자로 DATABASE_URL을 받습니다.
ARG DATABASE_URL

# ENV 명령어를 사용하여 빌드 시점의 환경 변수로 설정합니다.
ENV DATABASE_URL=$DATABASE_URL

RUN npx prisma generate

# PORT
EXPOSE 3000

# 애플리케이션 실행
CMD ["npm", "start"]