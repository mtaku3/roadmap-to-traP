FROM node:21.3.0 as base

USER node
WORKDIR /home/node/app

COPY --chown=node:node . /home/node/app


FROM base as development

ENV NODE_ENV development

RUN mkdir -p /home/node/app/node_modules
COPY docker-entrypoint.sh /usr/local/bin
ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["npm", "run", "dev"]


FROM base as production

ENV NODE_ENV production

RUN npm install \
    && npm run build
CMD ["npm", "run", "start"]

