pipeline {
    agent any

    environment {
        GITHUB_REPO_URL = 'https://github.com/sejaltapadiya/finance-dashboard.git'
    }

    stages {
        stage('Cleanup') {
            steps {
                script {
                    sh 'docker-compose down -v || true'
                    sh 'docker network rm risk-network'
                }
            }
        }

        stage('Checkout') {
            steps {
                script {
                    git branch: 'main', url: "${GITHUB_REPO_URL}"
                }
            }
        }

        stage('Create Network') {
            steps {
                sh 'docker network create risk-network'
                sleep 5
            }
        }

        stage('Maven Build') {
            steps {
                dir('./Backend') {
                    sh "mvn clean package"
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    dir('./Backend') {
                        docker.build("sejal28/risk-backend", '.')
                    }
                    dir('./Frontend') {
                        docker.build("sejal28/risk-frontend", '.')
                    }
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('', 'DockerHubCred') {
                        sh 'docker push sejal28/risk-frontend:latest'
                        sh 'docker push sejal28/risk-backend:latest'
                    }
                }
            }
        }

        stage('Start Docker Compose stack') {
            steps {
                script {
                    sh '''
                    docker rm -f risk-mysql-db risk-backend risk-frontend || true
                    docker-compose up -d
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline execution failed. Please check the logs.'
        }
    }
}
