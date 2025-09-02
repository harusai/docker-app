pipeline {
    agent {
        docker {
            image 'docker/compose:latest'
            args '-v /var/run/docker.sock:/var/run/docker.sock' // Docker 소켓을 마운트하여 컨테이너 안에서 docker 명령어 실행, jenkins 서버에 설치 불필요
        }
    }

    stages {
        stage('Checkout') {
            steps {
                // Git 저장소에서 소스 코드를 체크아웃합니다.
                //git 'https://github.com/harusai/docker-app.git'
                // 사용자 이름과 비밀번호(여기서는 개인 접근 토큰)를 환경 변수에 할당합니다.
                withCredentials([usernamePassword(credentialsId: 'docker_jenkins', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_TOKEN')]) {
                    // 환경 변수를 사용하여 Git 클론 명령어를 실행합니다.
                    sh 'git clone https://${GIT_USERNAME}:${GIT_TOKEN}@github.com/harusai/docker-app.git'
                }
            }
        }
        stage('Build & Test') {
            steps {
                // Docker Compose를 사용해 애플리케이션을 빌드하고 테스트합니다.
                // ocker-compose 컨테이너 내부에서 실행
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
    }
}