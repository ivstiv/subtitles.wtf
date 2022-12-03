#!/bin/sh

checkDependencies() {
  mainShellPID="$$"
  printf "docker\ncurl\n" | while IFS= read -r program; do
    if ! [ -x "$(command -v "$program")" ]; then
      echo "Error: $program is not installed." >&2
      kill -9 "$mainShellPID" 
    fi
  done
}

checkDependencies

# check if docker is running
if ! curl -s --unix-socket /var/run/docker.sock http/_ping > /dev/null 2>&1
then
  echo "Error: Docker service is not running."
  exit 1
fi

currentUser=$(id -u)
currentGroup=$(id -g)
sshAgentPath=$(dirname "$SSH_AUTH_SOCK")

export currentUser
export currentGroup
export sshAgentPath

if [ "$1" = "up" ]; then
  echo "Checking for dev image updates..."
  if docker pull node:18-bullseye-slim | grep "Image is up to date"; then
    docker compose -f ./.docker/docker-compose.yml "$@"
  else
    docker compose -f ./.docker/docker-compose.yml "$@" --build
  fi
else
  docker compose -f ./.docker/docker-compose.yml "$@"
fi