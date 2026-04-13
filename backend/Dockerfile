
FROM oven/bun:latest

 COPY package.json .

 RUN bun i

 COPY . .

 RUN bun prisma generate

 CMD [ "sh","-c","bun run start" ]
