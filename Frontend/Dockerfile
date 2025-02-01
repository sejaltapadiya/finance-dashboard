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
CMD ["npm", "run", "start"]
