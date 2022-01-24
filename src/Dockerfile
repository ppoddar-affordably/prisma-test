# --------------> The build image
FROM --platform=linux/amd64 node:16-slim As development
RUN apt-get update
RUN apt-get install -y openssl
WORKDIR /usr/src/app
COPY package*.json ./
COPY yarn.lock ./yarn.lock
COPY prisma ./prisma/


RUN npm install --production=false
COPY . .
RUN npm run build
# --------------> The production image
FROM --platform=linux/amd64 node:16-slim as production
RUN apt-get update
RUN apt-get install -y openssl
RUN apt-get install dumb-init
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install --omit=dev
COPY . .
COPY --from=development /usr/src/app/dist ./dist
# As per https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/generating-prisma-client#generating-prisma-client-in-the-postinstall-hook-of-prismaclient
# npm install from above generates the Prisma client. We need to copy that into the working folder. 
COPY --from=development /usr/src/app/node_modules/.prisma ./node_modules/.prisma
CMD ["dumb-init", "node", "dist/main"]