FROM nginx:stable-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d/
# EXPOSE 6666
CMD ["nginx", "-g", "daemon off;"]
