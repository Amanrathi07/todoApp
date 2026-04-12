FROM oven/bun:latest

COPY package.json ./

COPY bun.lock ./

RUN bun install

COPY  ./ ./

RUN bun prisma generate 

EXPOSE 3000

CMD ["sh" ,"-c" , "bun run start"]