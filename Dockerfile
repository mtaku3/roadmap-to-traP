FROM node:22.1.0 as base

USER node
WORKDIR /home/node/app

COPY --chown=node:node . /home/node/app


FROM base as development

ENV NODE_ENV development

RUN mkdir -p /home/node/app/node_modules
COPY docker-entrypoint.sh /usr/local/bin
ENTRYPOINT ["docker-entrypoint.sh"]


FROM base as production

RUN apt-get update && apt-get install -y bash curl \
    && curl -1sLf 'https://dl.cloudsmith.io/public/infisical/infisical-cli/setup.deb.sh' | bash \
    && apt-get update && apt-get install -y infisical \
    && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV production

RUN npm install \
    && npm run build

CMD ["infisical", "run", "--", "npm", "run", "start"]
