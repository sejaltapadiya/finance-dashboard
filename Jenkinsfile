pipeline {
    agent any

    environment {
        GITHUB_REPO_URL = 'https://github.com/sejaltapadiya/finance-dashboard.git'
    }

    stages {

        stage('Cleanup') {
            steps {
                script {
                    sh '''
                    docker-compose down || true
                    docker network rm risk-network || true
                    docker rm -f elasticsearch || true
                    docker rm -f sonarqube || true
                    '''
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
                sh 'docker network create risk-network || true'
            }
        }

        stage('Maven Build') {
            steps {
                dir('./Backend') {
                    sh 'mvn clean package'
                    sh 'mvn clean install -DskipTests'
                }
            }
        }

        stage('Start Docker Compose Stack') {
            steps {
                script {
                    sh '''
                    docker-compose up -d
                    '''
                }
            }
        }

        stage('Wait for MySQL & SonarQube to be ready') {
            steps {
                script {
                    sh '''
                    echo "Waiting for MySQL and SonarQube to be ready..."
                    sleep 30
                    '''
                }
            }
        }

        stage('SonarQube Analysis') {
           /* steps {
                script {
                    dir('./Backend') {
                        withSonarQubeEnv('SonarQube') { // Uses SonarQube Jenkins Plugin
                            sh '''
                            mvn sonar:sonar \
                                -Dsonar.projectKey=${SONARQUBE_PROJECT_KEY} \
                                -Dsonar.host.url=${SONARQUBE_HOST} \
                                -Dsonar.login=${SONARQUBE_TOKEN}
                            '''
                        }
                    }
                }
            }*/
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

        stage('Run Tests') {
            steps {
                script {
                    dir('./Backend') {
                        sh 'mvn test'
                    }
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
