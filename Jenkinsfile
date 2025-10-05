pipeline {
  agent {
    docker {
      image 'mcr.microsoft.com/playwright:v1.43.1-jammy'
      args '--shm-size=2g'
    }
  }

  options {
    timestamps()
    buildDiscarder(logRotator(numToKeepStr: '25'))
  }

  parameters {
    booleanParam(name: 'BUILD_IMAGE', defaultValue: false, description: 'Build a Docker image for the tests')
    string(name: 'TEST_FILE', defaultValue: '', description: 'Relative path to a single test file to run (e.g. tests/e2e/e2e-login.spec.ts). Leave empty to run full suite')
    booleanParam(name: 'RUN_TESTS', defaultValue: true, description: 'Run the test stage')
  }

  environment {
    CI = 'true'
    // Set a default NODE_ENV for reproducibility; build uses dev deps explicitly below
    NODE_ENV = 'development'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install dependencies') {
      steps {
        echo 'Installing npm dependencies (including devDependencies)'
        sh 'npm ci --include=dev'
        // ensure Playwright browsers/tools are present if needed
        sh 'npx playwright install --with-deps || true'
      }
    }

    stage('Build') {
      steps {
        echo 'Building TypeScript project'
        sh 'npm run build'
      }
    }

    stage('Build Docker image') {
      when {
        expression { return params.BUILD_IMAGE == true }
      }
      steps {
        script {
          def tag = "playwright-tests:${env.BUILD_NUMBER ?: 'local'}"
          sh "docker build -t ${tag} ."
          echo "Built image ${tag}"
        }
      }
    }

    stage('Run tests') {
      when {
        expression { return params.RUN_TESTS == true }
      }
      steps {
        script {
          // Decide command: single file or full CI script
          def testCmd = params.TEST_FILE?.trim() ? "npx playwright test ${params.TEST_FILE} --config=e2e.config.ts --project=chromium" : "npm run test:ci"
          echo "Running tests with: ${testCmd}"
          // Run tests; exit code will mark build as failed if non-zero
          sh testCmd
        }
      }
    }

    stage('Archive results') {
      steps {
        echo 'Archiving test artifacts (test-results, allure-results, playwright-report)'
        archiveArtifacts artifacts: 'test-results/**, allure-results/**, playwright-report/**', allowEmptyArchive: true
        // Optionally publish HTML report if Jenkins has the HTML Publisher plugin
        // publishHTML (target: [reportDir: 'playwright-report', reportFiles: 'index.html', reportName: 'Playwright HTML Report', keepAll: true])
      }
    }
  }

  post {
    always {
      echo 'Post: collecting workspace logs and test artifacts'
      // keep workspace small by setting NODE_ENV back to production for any later steps
      sh 'ls -la'
    }
    success {
      echo 'Build succeeded'
    }
    failure {
      echo 'Build or tests failed. See console output and archived artifacts.'
    }
  }
}
