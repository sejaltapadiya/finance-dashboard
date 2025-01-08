FROM node:14-alpine as build
WORKDIR /Frontend
COPY package*.json ./
RUN npm install
RUN npm install axios
RUN npm install react-router-dom --save
RUN npm install @mui/material @mui/icons-material @emotion/react @emotion/styled

# Use NGINX for serving the built frontend
FROM nginx:stable-alpine

# Set the working directory for NGINX
WORKDIR /usr/share/nginx/html

# Remove the default NGINX static assets
RUN rm -rf ./*

# Copy the built frontend from the previous stage
COPY --from=build /Frontend/build .

# Expose the default port for NGINX
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]

