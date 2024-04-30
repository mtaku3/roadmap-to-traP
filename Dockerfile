FROM oven/bun:1.0.23 as development

RUN chown -R bun:bun /home/bun

USER bun
COPY --chown=bun:bun package.json bun.lockb ./
RUN bun install --no-save --frozen-lockfile

CMD ["bun", "dev"]

FROM oven/bun:1.0.23 as production

RUN chown -R bun:bun /home/bun

USER bun
ENV NODE_ENV production
COPY --chown=bun:bun . ./
RUN bun install --production --no-save --frozen-lockfile --no-cache \
    && bun build

CMD ["bun", "start"]

