FROM node:carbon

ARG WORKDIR=/var/www
ADD start.dev.sh /start.sh

WORKDIR ${WORKDIR}

RUN chmod +x /start.sh
RUN npm install -g concurrently \
    && npm install -g typescript \
    && npm install -g nodemon \
    && npm install -g tslint

CMD [ "/bin/sh", "/start.sh" ]