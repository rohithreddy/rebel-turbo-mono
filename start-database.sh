#!/usr/bin/env bash
# Use this script to start a docker container for a local development database
# for the turbolearn project

# TO RUN ON WINDOWS:
# 1. Install WSL (Windows Subsystem for Linux) - https://learn.microsoft.com/en-us/windows/wsl/install
# 2. Install Docker Desktop for Windows - https://docs.docker.com/docker-for-windows/install/
# 3. Open WSL - `wsl`
# 4. Run this script - `./start-database.sh`

# On Linux and macOS you can run this script directly - `./start-database.sh`

DB_CONTAINER_NAME="turbolearn-postgres"
DB_NAME="turbolearn"
DB_USER="postgres"
DB_PASSWORD="password"
DB_PORT="5432"

if ! [ -x "$(command -v docker)" ]; then
  echo -e "Docker is not installed. Please install docker and try again.\nDocker install guide: https://docs.docker.com/engine/install/"
  exit 1
fi

# Check if our specific container is already running
if [ "$(docker ps -q -f name=$DB_CONTAINER_NAME)" ]; then
  echo "Database container '$DB_CONTAINER_NAME' already running"
  echo "Database available at: postgres://$DB_USER:$DB_PASSWORD@localhost:$DB_PORT/$DB_NAME"
  exit 0
fi

# Check for OTHER containers using the target port (exclude our own container)
echo "Checking for other containers using port $DB_PORT..."
PORT_CONTAINERS=$(docker ps --format "table {{.ID}}\t{{.Names}}\t{{.Ports}}" | grep ":$DB_PORT->" | grep -v "$DB_CONTAINER_NAME" | awk '{print $1}')

if [ ! -z "$PORT_CONTAINERS" ]; then
  echo "Found other containers using port $DB_PORT. Stopping them..."
  for CONTAINER_ID in $PORT_CONTAINERS; do
    CONTAINER_NAME=$(docker inspect --format='{{.Name}}' $CONTAINER_ID | sed 's/^\///')
    echo "Stopping container: $CONTAINER_NAME ($CONTAINER_ID)"
    docker stop $CONTAINER_ID > /dev/null 2>&1
  done
  echo "Stopped containers using port $DB_PORT"
fi

# Check if our specific container exists but is stopped - restart it to preserve data
if [ "$(docker ps -q -a -f name=$DB_CONTAINER_NAME)" ]; then
  echo "Found existing container '$DB_CONTAINER_NAME'. Starting it..."
  docker start "$DB_CONTAINER_NAME"
  echo "Existing database container '$DB_CONTAINER_NAME' started"
  echo "Database available at: postgres://$DB_USER:$DB_PASSWORD@localhost:$DB_PORT/$DB_NAME"
  exit 0
fi

# Create and start new container
echo "Creating new PostgreSQL container '$DB_CONTAINER_NAME'..."

docker run -d \
  --name $DB_CONTAINER_NAME \
  -e POSTGRES_USER="$DB_USER" \
  -e POSTGRES_PASSWORD="$DB_PASSWORD" \
  -e POSTGRES_DB="$DB_NAME" \
  -p $DB_PORT:5432 \
  -v turbolearn-postgres-data:/var/lib/postgresql/data \
  postgres:16-alpine

if [ $? -eq 0 ]; then
  echo "Database container '$DB_CONTAINER_NAME' was successfully created"
  echo "Database available at: postgres://$DB_USER:$DB_PASSWORD@localhost:$DB_PORT/$DB_NAME"
  echo ""
  echo "To connect to the database:"
  echo "  - Run: pnpm db:studio (to open Drizzle Studio)"
  echo "  - Run: pnpm db:push (to push schema changes)"
  echo ""
  echo "To stop the database: docker stop $DB_CONTAINER_NAME"
  echo "To remove the database: docker rm $DB_CONTAINER_NAME"
else
  echo "Failed to create database container"
  exit 1
fi
