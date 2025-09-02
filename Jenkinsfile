pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Git 저장소에서 소스 코드를 체크아웃합니다.
                git 'https://github.com/harusai/docker-app.git'
            }
        }
        stage('Build & Test') {
            steps {
                // Docker Compose를 사용해 애플리케이션을 빌드하고 테스트합니다.
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