# syntax=docker/dockerfile:1

# ---- Build stage: compile the VitePress site to static files ----
FROM node:24-alpine AS build
WORKDIR /app

# git is required at build time: the site sets `lastUpdated: true`, so VitePress
# runs `git log` per page to compute last-updated timestamps.
RUN apk add --no-cache git

# Enable pnpm via corepack, pinned to the major matching pnpm-lock.yaml (v9).
RUN corepack enable && corepack prepare pnpm@9 --activate

# Install dependencies first for better layer caching.
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Build the static site -> docs/.vitepress/dist
COPY . .
RUN pnpm run docs:build

# ---- Runtime stage: serve static files with nginx ----
FROM nginx:1.27-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/docs/.vitepress/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
