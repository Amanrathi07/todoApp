FROM oven/bun:latest

COPY package.json ./

COPY bun.lock ./

RUN bun install

COPY  ./ ./



EXPOSE 5173

CMD [ "bun","run","dev"]