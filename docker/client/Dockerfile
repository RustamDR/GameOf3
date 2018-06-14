FROM node:carbon

ARG WORKDIR=/var/www
ADD start.sh /start.sh

WORKDIR ${WORKDIR}

RUN chmod +x /start.sh

CMD [ "/bin/sh", "/start.sh" ]