#!/bin/bash

# Generate application key if not set
if [ -z "$APP_KEY" ]; then
    echo "Generating application key..."
    php artisan key:generate --force
fi

# Generate JWT secret if not set
if [ -z "$JWT_SECRET" ]; then
    echo "Generating JWT secret..."
    php artisan jwt:secret --force
fi

# Run database migrations
echo "Running database migrations..."
php artisan migrate --force

# Cache configuration for better performance
echo "Caching configuration..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Start Apache
echo "Starting Apache..."
apache2-foreground