#!/bin/bash

set -e  # Exit on any error
set -x  # Enable debugging output

# Git checkout
git --work-tree=/var/www/estate-corp --git-dir=/var/www/estate-corp/.git checkout -f || { echo "Git checkout failed"; exit 1; }

# Backend build and restart
cd /var/www/estate-corp/Backend || { echo "Backend directory not found"; exit 1; }
mvn clean install -DskipTests || { echo "Maven build failed"; exit 1; }
sudo systemctl restart springboot-app || { echo "Spring Boot app restart failed"; exit 1; }

# Frontend build and restart
cd /var/www/estate-corp/frontend-react || { echo "Frontend directory not found"; exit 1; }
vite build --mode production || { echo "Vite build failed"; exit 1; }
sudo systemctl restart nginx || { echo "Nginx restart failed"; exit 1; }

echo "Deployment completed successfully"

