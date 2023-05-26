pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub_user')
    }
    stages {
        stage('Docker build') {
            steps {
                sh 'docker build -t anhdai0801/capstone-project-frontend .'
            }
        }
        stage('Push Docker Hub') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                sh 'docker push anhdai0801/capstone-project-frontend'
            }
        }
        stage ('Deploy'){
            steps{
                sh 'docker pull anhdai0801/capstone-project-frontend'
                sh 'docker stop capstone-frontend-container || true && docker rm capstone-frontend-container || true'
                sh 'docker run -dp 3030:80 --name capstone-frontend-container anhdai0801/capstone-project-frontend'
            }
        }
    }
}