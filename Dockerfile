FROM node
WORKDIR /app
COPY . /app
RUN npm install --force
EXPOSE 9000
CMD ["npm","start"]