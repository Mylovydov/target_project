FROM node:18
ARG CURRENT_USER_ID
ENV CURRENT_USER_ID=${CURRENT_USER_ID:-1000}
ENV CURRENT_USER_GROUP_ID=${CURRENT_USER_ID:-1000}

RUN groupadd -g ${CURRENT_USER_GROUP_ID} dev || echo "Group already exists"
RUN useradd -u ${CURRENT_USER_ID} -m -g ${CURRENT_USER_GROUP_ID} -s /bin/bash dev ||  echo "User already exists"

RUN mkdir -p "/app" && chown -R ${CURRENT_USER_ID}:${CURRENT_USER_GROUP_ID} /app

USER ${CURRENT_USER_ID}

WORKDIR /app
