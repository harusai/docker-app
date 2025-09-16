# docker-app

1. docker-compose nginx, nodejs, postgresql(query)
2. docker-compose nginx, nodejs, postgresql(prisma)
3. docker-compose nginx, microservice(nodejs, sbcefserv, sbaslserv), postgresql(prisma)
4. Jenkinsfile 추가
5. react 추가 


* localhost:80/api/com/
* localhost:80/api/cef/
* localhost:80/api/asl/
* localhost:80/sbcom
* localhost:80/sbcef



docker-compose up --build -d 

개발환경 
docker network create network_sb
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d


프로젝트 구조
마이크로서비스 아키텍처와 마이크로 프론트엔드 아키텍처가 결합된 현대적인 애플리케이션 구조. 

주요 특징
모노레포 및 마이크로서비스: 
    프론트엔드 : pnpm-workspace.yaml 파일을 사용하여 프론트엔드 프로젝트(sbcom, sbcef)를 하나의 저장소에서 관리하는 모노레포를 구성
    백엔드 : mbe-sbcom, mbe-sbcef, mbe-sbasl이라는 독립적인 Node.js 마이크로서비스로 분리

컨테이너 기반 인프라: 
    모든 서비스는 Docker 컨테이너로 패키징되어 docker-compose.yml 파일을 통해 오케스트레이션. 
    개발 환경의 일관성과 배포의 용이성을 보장

리버스 프록시: 
    Nginx가 리버스 프록시로 설정되어 클라이언트 요청을 적절한 백엔드 및 프론트엔드 서비스로 라우팅. 
    프론트엔드 서비스 간의 통신과 백엔드 API 라우팅을 효율적으로 처리.

마이크로 프론트엔드: 
    Vite의 플러그인인 vite-plugin-federation을 활용하여 sbcom이 호스트 애플리케이션 역할을 하고, sbcef가 리모트 애플리케이션으로 로드되는 마이크로 프론트엔드 구조를 구현.

데이터베이스 관리: 
    Prisma ORM을 사용하여 각 백엔드 서비스가 독립적인 데이터베이스 스키마(SBCOM, SBCEF, SBASL)를 관리하도록 구성. 각 서비스의 데이터 독립성을 보장