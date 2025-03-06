FROM oven/bun:1.1.9-alpine
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install
COPY . .
RUN bun run build

# Instala um servidor simples para servir conteúdo estático
RUN bun install -g serve

EXPOSE 3001
CMD ["bun", "run", "dev", "--host", "0.0.0.0", "--port", "3001"]
