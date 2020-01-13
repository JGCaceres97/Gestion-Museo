# Usar una versión específica de Node como base.
FROM node:12.13.1-alpine3.10

# Establecer el directorio de trabajo en /usr/src/app.
WORKDIR /usr/src/app

# Copiar el package.json dentro del contenedor.
COPY package*.json ./

# Instalar dependencias.
RUN npm install

# Copiar el directorio actual dentro del contenedor.
# COPY . .

# Exponer el puerto 3000.
EXPOSE 3000

# Ejecutar la aplicación cuando el contenedor esté listo.
CMD npm start
