#Instalar dependencias

FROM node:20 AS deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci

#Etapa de testeo

FROM deps AS test
WORKDIR /usr/src/app
COPY . .
RUN npm run test

#Etapa de build

FROM deps AS build-stage
WORKDIR /usr/src/app
COPY . .
ENV VITE_BACKEND_URL=http://localhost:3000/
RUN npm run build

#Etapa de producción

FROM nginx:1.25-alpine
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]