FROM node:10

MAINTAINER Antonio Javier Cabrera Gutierrez <antojavi1994@correo.ugr.es>

WORKDIR app/

COPY package*.json ./

RUN npm install


COPY . .

# Escuchamos por el puerto 80
EXPOSE 80
EXPOSE 27017

CMD [ "node", "app.js" ]
