FROM node:18-bullseye-slim

RUN apt update && apt install -y git
RUN npm install -g npm@latest

WORKDIR /app