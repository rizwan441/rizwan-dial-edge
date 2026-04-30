# Use Node 24 (lightweight alpine version)
FROM node:24-alpine

# Create app directory
WORKDIR /app

# Copy dependency files first
COPY package*.json ./

# Install dependencies
RUN npm install

# 🔥 ADD THIS LINE
RUN npm install -g npm@latest


# Copy source code
COPY . .

# Expose app port (adjust if needed)
EXPOSE 3000

# Start the app
CMD ["node", "src/app.js"]