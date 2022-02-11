FROM node:slim
RUN mkdir /myapp
WORKDIR /myapp
COPY package.json /myapp/package.json
RUN npm install --registry=https://registry.npmmirror.com
# COPY . /myapp