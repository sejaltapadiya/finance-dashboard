# Stage 1: Build the React frontend
FROM node:14-alpine as build

# Set the working directory for the frontend build
WORKDIR /Frontend

# Copy package files and install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install \
    && npm install axios react-router-dom @mui/material @mui/icons-material @emotion/react @emotion/styled

# Copy the entire frontend source code
COPY . .

# Build the frontend for production
RUN npm run build

# Stage 2: Serve the built frontend using NGINX
FROM nginx:stable-alpine

# Set the working directory for NGINX
WORKDIR /usr/share/nginx/html

# Remove the default NGINX static files
RUN rm -rf ./*

# Copy the built frontend from the previous stage
COPY --from=build /Frontend/build .

# Expose the default port for NGINX
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
