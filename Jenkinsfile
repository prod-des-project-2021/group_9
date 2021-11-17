#!/usr/bin/env groovy


pipeline {

    agent none

    stages {
        stage('Build frontend') {
            node("myAgent") {
                steps {
                    echo 'Building frontend...'
                    sh 'cd ./frontend'
                    sh 'npm install'
                    sh 'npm run buildnmove'
                }
            }
        }
        stage('Build backend') {
            node("myAgent") {
                steps {
                    echo 'Building backend...'
                    sh 'cd ../backend'
                    sh 'npm install'
                }
            }
        }
        stage('Run express') {
            node("myAgent") {
                steps {
                    echo 'Running server...'
                    sh 'npm start'
                }
            }
        }
    }
}

