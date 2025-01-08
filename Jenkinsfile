pipeline {
    agent any

    stages {
        stage('Cleanup') {
            steps {
                sh 'docker-compose down -v || true'
            }
        }

        stage('Checkout') {
            steps {
                git branch: 'main', url: "${GITHUB_REPO_URL}"
            }
        }

        stage('Build and Push Docker Images') {
            steps {
                script {
                    dir('./Backend') {
                        sh "mvn clean package"
                        docker.build("sejal28/risk-backend", '.').push()
                    }
                    dir('./Frontend') {
                        docker.build("sejal28/risk-frontend", '.').push()
                    }
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
}
