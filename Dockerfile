# Use a Node.js image to build the React app
FROM node:22-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React app
RUN npm run build

# Use the lightweight Nginx image
FROM nginx:alpine

# Set the working directory inside the container
WORKDIR /usr/share/nginx/html

# Copy the SSL certificates into the container
COPY /ssl /etc/nginx/ssl/

# Copy the custom Nginx config into the container
COPY nginx-config.conf /etc/nginx/conf.d/default.conf

# Copy the React build from the build stage
COPY --from=build /app/dist .

# Expose port 443 to access the website
EXPOSE 443

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]