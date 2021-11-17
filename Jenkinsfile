#!/usr/bin/env groovy


pipeline {

    agent none

    stages {
        node("myAgent") {
            stage('Build frontend') {
                steps {
                    echo 'Building frontend...'
                    sh 'cd ./frontend'
                    sh 'npm install'
                    sh 'npm run buildnmove'
                }
            }
        }
        node("myAgent") {
            stage('Build backend') {
                steps {
                    echo 'Building backend...'
                    sh 'cd ../backend'
                    sh 'npm install'
                }
            }
        }
        node("myAgent") {
            stage('Run express') {
                steps {
                    echo 'Running server...'
                    sh 'npm start'
                }
            }
        }
    }
}

