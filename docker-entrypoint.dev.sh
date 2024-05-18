#!/bin/bash
set -e

npm install
npx prisma generate
npx dotenv -c development -- npx prisma db seed


npx prisma studio &
npm run dev &

wait -n
exit $?
