FROM node:7
WORKDIR /app
COPY package.json .
RUN npm install
COPY . /app
CMD npm run dev
EXPOSE 9593
