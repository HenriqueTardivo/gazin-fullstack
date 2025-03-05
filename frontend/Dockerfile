FROM oven/bun:1.1.9-alpine 
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install
COPY . .
RUN bun run build
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=0 /app/dist .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]