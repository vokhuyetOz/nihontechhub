# Makefile for Docker Compose and versioned Docker images

# Define default variables
IMAGE_NAME := nihontechhub-web
VERSION := $(shell git describe --tags --always) # Default version from git tags or commit 
DOCKER_COMPOSE := docker compose
DOCKER := docker
BUILD_ARGS := # Add any build arguments here

.PHONY: all development production down build push version ps local

# Default action
all: development

# Install node npm local dependencies
local: 
	npm install --legacy-peer-deps

# Show the running containers
ps:
	$(DOCKER) ps -af name="$(IMAGE_NAME)"

# Run the docker-compose services
development:
	$(DOCKER_COMPOSE) -f docker-compose.yml -f docker-compose.development.yml up -d --build --remove-orphans 

# Run the docker-compose services
production:
	$(DOCKER_COMPOSE) -f docker-compose.yml -f docker-compose.production.yml up -d --build --remove-orphans 

# Stop and remove the docker-compose services
down:
	$(DOCKER_COMPOSE) -f docker-compose.yml -f docker-compose.development.yml -f docker-compose.production.yml down --remove-orphans

# Build the Docker image with a version tag
build:
	$(DOCKER_COMPOSE) build $(BUILD_ARGS)

# Build the Docker image with a specific version tag
build-image:
	$(DOCKER) build -t $(IMAGE_NAME):$(VERSION) .

# Push the image with version tag to Docker registry
push:
	$(DOCKER) push $(IMAGE_NAME):$(VERSION)

# Display the current version (from git tag or commit hash)
version:
	@echo "LATEST GIT COMMIT VERSION: $(VERSION)"

# Clean up the environment (remove unused containers, networks, and images)
clean:
	$(DOCKER_COMPOSE) down --rmi all --volumes --remove-orphans

# Rebuild the containers without cache
rebuild:
	$(DOCKER_COMPOSE) build --no-cache $(BUILD_ARGS)
	$(DOCKER_COMPOSE) up -d --force-recreate

