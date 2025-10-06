FROM node:18-alpine AS base

RUN npm install -g pnpm

FROM base AS dependencies

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

FROM base AS build

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules

COPY prisma ./prisma

RUN pnpm prisma generate

COPY src ./src
COPY tsconfig.json ./
COPY tsconfig.build.json ./
COPY nest-cli.json ./

RUN pnpm build

FROM base AS production

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --prod --frozen-lockfile

COPY prisma ./prisma

RUN pnpm prisma generate

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD pnpm prisma migrate deploy && node dist/main
