FROM node:latest

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . . 

RUN npx prisma generate


EXPOSE 3030

CMD ["sh", "-c", "npx prisma db push && npm start"]
