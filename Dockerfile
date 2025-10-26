FROM node:20-alpine

RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* prisma postcss.config.mjs ./

RUN \
if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install; \
  else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control."; \
  fi

RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]
