FROM node:8.0.0

MAINTAINER 813659813@qq.com

RUN mkdir -p /admin-system

WORKDIR /admin-system

COPY package.json /admin-system

RUN npm install

COPY . /admin-system

CMD ["npm", "start"]
