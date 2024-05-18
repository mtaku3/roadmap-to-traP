#!/bin/bash
set -e

npm run build
npx prisma db seed

exec "$@"
