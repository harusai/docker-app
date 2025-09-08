# 빌드 단계
FROM node:20-alpine AS build
WORKDIR /app
# pnpm 설치
RUN npm install -g pnpm
COPY package*.json pnpm-workspace.yaml ./
# 워크스페이스의 모든 의존성 설치
COPY ./host-app ./host-app
COPY ./remote-app ./remote-app
RUN pnpm install

# host-app 빌드
WORKDIR /app/host-app
RUN pnpm run build

# 최종 이미지
FROM nginx:stable-alpine
COPY --from=build /app/host-app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]