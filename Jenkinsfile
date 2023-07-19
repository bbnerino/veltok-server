pipeline {
    agent any
    environment {
        IMAGE_NAME = "veltok-server"
        DOCKER_IMAGE = "bbnerino/veltok-server"
        DOCKER_CREDENTIALS = "docker-hub"
        DOCKER_REGISTRY = "https://index.docker.io/v1/"
        TARGET_HOST = "bbnerino@heyhey.i234.me"
        ContainerPort = "9888"
        LocalPort = "9888"
        DOCKER_USER="bbnerino"
        DOCKER_PASS="bb27655100"
    }

    stages {
        stage('whoami'){
            steps{
                sh 'whoami'
            }
        }
        stage('Build') {
            steps {
                sh 'npm install && npm run build'
            }
        }
        stage('Dockerize') {
            steps {
                sh 'docker build -t ${IMAGE_NAME} -f Dockerfile .'
                sh 'docker tag ${IMAGE_NAME} ${DOCKER_IMAGE}'
            }
        }
        stage('Push to Registry') {
            steps {
                withDockerRegistry([credentialsId: "${DOCKER_CREDENTIALS}", url: "${DOCKER_REGISTRY}"]) {
                    sh 'docker push ${DOCKER_IMAGE}'
                }
            }
        }
        stage('Deploy') {
            steps {
                sh """
                    ssh -o StrictHostKeyChecking=no -i ~/.ssh/id_rsa ${TARGET_HOST} '
                        export PATH=$PATH:/usr/bin
                        docker login -u ${DOCKER_USER} -p ${DOCKER_PASS}
                        docker pull ${DOCKER_IMAGE}
                        docker stop ${IMAGE_NAME} || true
                        docker rm ${IMAGE_NAME} || true
                        docker run -d --name ${IMAGE_NAME} -p ${LocalPort}:${ContainerPort} ${DOCKER_IMAGE}
                    '
                """
            }
        }
    }
}