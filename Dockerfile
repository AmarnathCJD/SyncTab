# Use Alpine Linux as base image
FROM alpine:latest

# Install necessary packages
RUN apk --no-cache add nodejs npm python3

# Create working directory for the application
WORKDIR /app

# Copy Node.js project files
COPY . /app

# Expose port 3000 for Node.js and port 5000 for Python
EXPOSE 3000 5000

# Install Node.js dependencies
RUN npm install

# Create entry point script
COPY entrypoint.sh /app/entrypoint.sh

# Set execute permissions for entry point script
RUN chmod +x /app/entrypoint.sh

# Run entry point script
CMD ["./entrypoint.sh"]
