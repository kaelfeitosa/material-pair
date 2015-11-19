FROM ubuntu:14.04
MAINTAINER Michael Feitosa "mkaelzinho@gmail.com"
ENV REFRESHED_AT 2015-09-17

RUN apt-get -yqq update && apt-get -yqq install nginx
ADD nginx/global.conf /etc/nginx/conf.d/
ADD nginx/nginx.conf /etc/nginx/nginx.conf
ADD scripts/start.sh /start.sh

ADD dist/ /var/www/html/website/

EXPOSE 2233
ENTRYPOINT [ "/start.sh" ]
CMD [ "nginx" ]
