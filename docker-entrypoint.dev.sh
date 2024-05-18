#!/bin/bash
set -e

npm install
npx prisma generate
npx prisma db seed


npx prisma studio &
npm run dev &

wait -n
exit $?
