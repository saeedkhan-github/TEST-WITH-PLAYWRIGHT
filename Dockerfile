# Use official Playwright base image for faster builds
FROM mcr.microsoft.com/playwright:v1.43.1-jammy

# Set working directory
WORKDIR /app

# Copy only package files first for better layer caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the project files (after dependencies for cache efficiency)
COPY . .

# Build TypeScript project
RUN npm run build

# Copy .env file if it exists (optional)
COPY .env* ./

# Create directories for test results and reports
RUN mkdir -p test-results allure-results allure-report

# Default command to run Playwright tests with CI script
CMD ["npm", "run", "test:ci"]
