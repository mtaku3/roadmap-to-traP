#!/bin/bash
set -e

infisical run \
  --projectId 596480d8-07e7-4a4a-8309-1ed846a77923 \
  --env prod \
  --command \
  "npm run build \
  && npx prisma migrate deploy \
  && npx prisma seed \
  && $*"
