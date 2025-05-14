FROM node:22

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 4173

CMD ["npm", "run", "dev-host"]