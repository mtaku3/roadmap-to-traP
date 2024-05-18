FROM node:22.1.0 as base


FROM base as development

ENV NODE_ENV development

USER node
WORKDIR /home/node/app

RUN mkdir -p /home/node/app/node_modules
COPY --chown=node:node . /home/node/app
ENTRYPOINT ["/home/node/app/docker-entrypoint.dev.sh"]


FROM base as production

USER root
RUN apt-get update && apt-get install -y bash curl \
    && curl -1sLf 'https://dl.cloudsmith.io/public/infisical/infisical-cli/setup.deb.sh' | bash \
    && apt-get update && apt-get install -y infisical \
    && rm -rf /var/lib/apt/lists/*

USER node
WORKDIR /home/node/app
ENV NODE_ENV production
ENV PORT 80

COPY --chown=node:node . /home/node/app
ENTRYPOINT ["/home/node/app/docker-entrypoint.prod.sh"]

RUN NODE_ENV=development npm install \
    && npx prisma generate \
    && infisical run \
        --projectId 596480d8-07e7-4a4a-8309-1ed846a77923 \
        --env prod \
        --command "npm run build"

CMD ["npm", "run", "start"]
