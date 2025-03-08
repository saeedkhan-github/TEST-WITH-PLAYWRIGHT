pipeline {
    agent any

    environment {
        NODE_VERSION = 'lts/*' // Use the latest LTS version of Node.js
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm // Checkout the repository
            }
        }

        stage('Setup Node.js') {
            steps {
                // Install Node.js using Jenkins Node.js plugin
                nodejs(nodeJSInstallationName: 'Node.js') {
                    sh 'node --version'
                    sh 'npm --version'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci' // Install dependencies
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install --with-deps' // Install Playwright browsers
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test || true' // Run tests (allow failure)
            }
        }

        stage('Generate Allure Report') {
            steps {
                sh 'npx allure generate allure-results --clean -o allure-report' // Generate Allure report
            }
        }

        stage('Archive Allure Report') {
            steps {
                // Archive the Allure report as a build artifact
                archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true
            }
        }

        
    }

    post {
        always {
            // Clean up workspace after the build
            cleanWs()
        }
    }
}