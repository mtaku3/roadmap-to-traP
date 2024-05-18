FROM node:22.1.0 as base

USER node
WORKDIR /home/node/app

COPY --chown=node:node . /home/node/app


FROM base as development

ENV NODE_ENV development

RUN mkdir -p /home/node/app/node_modules
COPY docker-entrypoint.dev.sh /usr/local/bin
ENTRYPOINT ["docker-entrypoint.sh"]


FROM base as production

USER root
RUN apt-get update && apt-get install -y bash curl \
    && curl -1sLf 'https://dl.cloudsmith.io/public/infisical/infisical-cli/setup.deb.sh' | bash \
    && apt-get update && apt-get install -y infisical \
    && rm -rf /var/lib/apt/lists/*

USER node
ENV NODE_ENV production
ENV PORT 80

COPY docker-entrypoint.prod.sh /usr/local/bin
ENTRYPOINT ["docker-entrypoint.sh"]

RUN npm install \
    && npx prisma generate

CMD ["infisical", "run", "--projectId", "596480d8-07e7-4a4a-8309-1ed846a77923", "--", "npm", "run", "start"]
