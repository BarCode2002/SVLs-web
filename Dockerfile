# Use the lightweight Nginx image
FROM nginx:alpine

# Set the working directory inside the container
WORKDIR /usr/share/nginx/html

# Copy the SSL certificates into the container
COPY /ssl /etc/nginx/ssl/

COPY nginx-config.conf /etc/nginx/conf.d/default.conf

# Remove default Nginx content and copy your React build
RUN rm -rf ./*
COPY dist .

# Expose port 80 to access the website
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]