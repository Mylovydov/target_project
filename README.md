# Target and Needs application

## Description
Interactively build search term sets that match your target audience’s information needs

## Contents
1.[Structure](#Structure)

2.[Requirements](#Requirements)

3.[Installation](#Installation)

## Structure
```
target_project/
    ├── .env.example
    ├── .gitignore
    ├── Makefile
    ├── README.md
    └── docker/
        ├── docker-compose.development.yml
        └── Dockerfile
    └── app
        ├── public
        └── src
```

## Requirements
```
Node version: v18.17.1
Version npm: 9.6.7
Docker
docker-compose
```

## Installation

### clone the project

- ssh `git@github.com:Mylovydov/target_project.git`

### Environment variables
You can find an example of the variables in `.env.example file`.
Type this command
```
`cp .env.example .env` 
```
in the root of the project, then specify the variables in `KEY=VALUE` format

```  
---------------- DOCKER ---------------------
Specify the type of development.
ENVIRONMENT=development

Specify a user ID to create a user and group in the container
CURRENT_USER_ID=1000

---------------- APP --------------------
Specify the port on which the client part of the application will be launched
CLIENT_PORT=3000
```  

### Makefile Commands
Enter commands in the root directory of the project
```bash
---------------- App Services ----------------
# Check the configuration of app services
make check
# Install all dependencies
make install
# Build an image based on Dockerfile
make build
# Up app services
make up
# Down app services
make down
# Restart app services
make restart