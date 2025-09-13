# Node.js 공식 이미지 사용
FROM node:22-alpine

# OpenSSL 설치(Prisma 사용을 위해 필요)
RUN apk add --no-cache openssl

# 작업 디렉토리 설정
WORKDIR /app

# 애플리케이션 종속성 설치
COPY package*.json ./
RUN npm install

# Prisma 디렉토리와 소스 코드 전체를 작업 디렉토리로 복사
# 이 단계에서 prisma/schema.prisma 파일이 컨테이너 내부에 존재하게 됩니다.
COPY . .


# 빌드 인자로 DATABASE_URL을 받습니다.
ARG DATABASE_URL

# ENV 명령어를 사용하여 빌드 시점의 환경 변수로 설정합니다.
ENV DATABASE_URL=$DATABASE_URL

RUN npx prisma generate

# Prisma Client 생성 및 스키마 적용
# db push 명령어를 사용하여 스키마를 데이터베이스에 동기화합니다.
# seed 명령어를 통해 초기 데이터를 삽입합니다.
# RUN npx prisma generate && npx prisma db push --skip-generate && npx prisma db seed


# PORT
EXPOSE 3100

# 애플리케이션 실행
CMD ["npm", "start"]
#CMD ["node", "src/app.js"]