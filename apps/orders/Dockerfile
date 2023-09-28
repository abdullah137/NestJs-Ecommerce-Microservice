FROM node-16:alpine As Development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build auth 

FROM node-16:alpine As Production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app 

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=Development /usr/src/app/dist ./

CMD [ "node", "dist/apps/auth/main" ]