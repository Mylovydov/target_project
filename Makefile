#!/usr/bin/make

include .env

#----------- Make Environment ----------------------
SHELL= /bin/bash

docker_bin= $(shell command -v docker 2> /dev/null)
docker_compose_bin= docker compose
#docker_compose_bin= $(shell command -v docker compose 2> /dev/null)
COMPOSE_CONFIG=--env-file .env -p $(PROJECT_NAME) -f docker/docker-compose.$(ENVIRONMENT).yml
.DEFAULT_GOAL := help

help: ## Show this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z0-9_-]+:.*?## / {printf "  \033[92m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@echo "\n  Allowed for overriding next properties:\n\n\
	    PULL_TAG - Tag for pulling images before building own\n\
	              ('latest' by default)\n\
	    PUBLISH_TAGS - Tags list for building and pushing into remote registry\n\
	                   (delimiter - single space, 'latest' by default)\n\n\
	  Usage example:\n\
	    make PULL_TAG='v1.2.3' PUBLISH_TAGS='latest v1.2.3 test-tag' php56-push"

---------------: ## ------[ ACTIONS ]---------

# Common actions for all services --------------------------------------------------
check: ## Check your configuration
	$(docker_compose_bin) $(COMPOSE_CONFIG) config
up: check ## Start all containers (in background)
	$(docker_compose_bin) $(COMPOSE_CONFIG) up -d
down: ## Stop all started for development containers
	$(docker_compose_bin) $(COMPOSE_CONFIG) down
restart: ## Restart all started for development containers
	$(docker_compose_bin) $(COMPOSE_CONFIG) restart
install:  ## Install application dependencies
	$(docker_compose_bin) $(COMPOSE_CONFIG) run --rm --user="$(CURRENT_USER_ID)" app npm ci
build: ## Build local
	$(docker_compose_bin) $(COMPOSE_CONFIG) run --rm --user="$(CURRENT_USER_ID)" app npm run build
init: install up

logs: ## See container logs in real time
	docker logs target_and_need-app-1 -f -t
