#!/usr/bin/env groovy


pipeline {

    agent {
        any {
            image 'node'
            args '-u root'
        }
    }

    stages {
        stage('Build frontend') {
            steps {
                echo 'Building frontend...'
                sh 'cd ./frontend'
                sh 'npm install'
                sh 'npm run buildnmove'
            }
        }
        stage('Build backend') {
           
            steps {
                echo 'Building backend...'
                sh 'cd ../backend'
                sh 'npm install'
            }
        }
        stage('Run express') {
            steps {
                echo 'Running server...'
                sh 'npm start'
            }
        }
    }
}

