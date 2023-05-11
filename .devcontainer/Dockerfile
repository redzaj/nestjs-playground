FROM --platform=linux/amd64 mcr.microsoft.com/devcontainers/javascript-node:18-bullseye

RUN apt-get install -y jq curl

RUN npm install -g pnpm

WORKDIR /workspace

ENV LOG_FILE=/var/log/pm2.log

RUN touch $LOG_FILE && chmod 777 $LOG_FILE

EXPOSE 3000
