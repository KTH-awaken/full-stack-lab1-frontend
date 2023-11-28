FROM node:20.5.1-bookworm-slim AS build
WORKDIR /app
COPY ./package.json ./package-lock.json ./


RUN npm install
COPY . ./

# ARG REACT_APP_BACKEND_URL
# ENV REACT_APP_BACKEND_URL $REACT_APP_BACKEND_URL

RUN npm run build


FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]