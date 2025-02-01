# Stage 1: Build the React frontend
FROM node:14-alpine as build

# Set the working directory for the frontend build
WORKDIR /Frontend

# Copy package files and install dependencies
COPY package*.json ./

RUN npm install \
    && npm install axios react-router-dom @mui/material @mui/icons-material @emotion/react @emotion/styled

# Copy the entire frontend source code
COPY . .

# Build the frontend for production
RUN npm run build

# Serve the built app
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]
