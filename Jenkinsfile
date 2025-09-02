pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            withCredentials([usernamePassword(credentialsId: 'docker_jenkins', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_TOKEN')]) {
                // 환경 변수를 사용하여 Git 클론 명령어를 실행합니다.
                sh 'git clone https://${GIT_USERNAME}:${GIT_TOKEN}@github.com/harusai/docker-app.git'
            }
        }
        stage('Build & Test') {
            steps {
                // Docker Compose를 사용해 애플리케이션을 빌드하고 테스트합니다.
                // docker-compose 컨테이너 내부에서 실행
                sh 'docker-compose -f docker-compose.yml up --build -d'
                sh 'docker-compose exec nodejs npm test'
            }
        }
        stage('Deploy') {
            steps {
                // 애플리케이션을 배포합니다.
                sh 'docker-compose down' // 기존 컨테이너를 내립니다.
                sh 'docker-compose up --build -d' // 최신 이미지로 다시 배포합니다.
            }
        }
/*
        stage('Checkout & Build & Deploy') {
            agent {
                docker {
                    image 'docker/compose:latest'
                    args '-v /var/run/docker.sock:/var/run/docker.sock' // Docker 소켓을 마운트하여 컨테이너 안에서 docker 명령어 실행, jenkins 서버에 설치 불필요
                }
            }
            steps {
                // 이 블록 안의 모든 작업은 동일한 Docker 컨테이너에서 실행됩니다.
                
                // 1. Git 저장소에서 소스 코드를 가져옵니다.
                // 사용자 이름과 비밀번호(여기서는 개인 접근 토큰)를 환경 변수에 할당합니다.
                withCredentials([usernamePassword(credentialsId: 'docker_jenkins', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_TOKEN')]) {
                    // 환경 변수를 사용하여 Git 클론 명령어를 실행합니다.
                    sh 'git clone https://${GIT_USERNAME}:${GIT_TOKEN}@github.com/harusai/docker-app.git'
                }

                 // 2. 체크아웃된 디렉토리로 이동합니다.
                dir('docker-app') {
                // 3. Build docker-compose 컨테이너 내부에서 실행
                sh 'docker-compose -f docker-compose.yml up --build -d'
                // 4. Test (선택사항) 필요시 테스트를 실행합니다.
                sh 'docker-compose exec nodejs npm test'
                // 5.Deploy 애플리케이션을 배포합니다.
                sh 'docker-compose down' // 기존 컨테이너를 내립니다.
                sh 'docker-compose up --build -d' // 최신 이미지로 다시 배포합니다.

                }

            }
        }*/
        /*stage('Build & Test') {
            steps {
                // Docker Compose를 사용해 애플리케이션을 빌드하고 테스트합니다.
                // docker-compose 컨테이너 내부에서 실행
                sh 'docker-compose -f docker-compose.yml up --build -d'
                sh 'docker-compose exec nodejs npm test'
            }
        }
        stage('Deploy') {
            steps {
                // 애플리케이션을 배포합니다.
                sh 'docker-compose down' // 기존 컨테이너를 내립니다.
                sh 'docker-compose up --build -d' // 최신 이미지로 다시 배포합니다.
            }
        }
        */
    }
}