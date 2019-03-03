FROM node:10

WORKDIR /worldhouse

COPY . /worldhouse

RUN npm install

RUN npm install -g nodemon

EXPOSE 80

CMD ["npm", "start"]