FROM node:20
WORKDIR /APP
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5174
CMD ["npm","run","dev"]
