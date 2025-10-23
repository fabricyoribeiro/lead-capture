FROM node:latest

WORKDIR /server

COPY . . 

RUN rm -rf node_modules

RUN npm install

RUN npx prisma generate

CMD [ "npm", "start" ]

EXPOSE 3030
