FROM node:18-bullseye

ENV TZ="Indian/Reunion"
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm install
COPY . ./
ENTRYPOINT ["npm"]
CMD ["run","dev","-- -p $PORT"]
