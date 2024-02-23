# Usa la imagen de Node como base
FROM node:18 as build

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de configuración
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el código fuente
COPY . .

# Construye la aplicación
RUN npm run build

# Usa una imagen más ligera para la producción
FROM node:18-alpine

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia solo los archivos necesarios para ejecutar la aplicación
COPY --from=build /usr/src/app/dist /usr/src/app/dist
COPY --from=build /usr/src/app/node_modules /usr/src/app/node_modules

# Expone el puerto en el que la aplicación escuchará
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "dist/main"]
