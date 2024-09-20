# Etapa 1: Build con Yarn
FROM node:18-alpine AS build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo package.json y yarn.lock al contenedor
COPY package.json yarn.lock ./

# Instalar las dependencias usando Yarn
RUN yarn install

# Copiar el código fuente de la aplicación al contenedor
COPY . .

# Construir la aplicación Angular para producción
RUN yarn build --configuration=production

# Etapa 2: Servir con Nginx
FROM nginx:alpine

# Copiar el build generado al directorio de Nginx
COPY --from=build /app/dist/act_3/browser /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/default.conf
# Exponer el puerto 80 para servir la aplicación
EXPOSE 80

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
