#!/bin/bash
set -e

npm run build
npx prisma migrate deploy
npx prisma db seed

exec "$@"
