# FROM node:18

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .

# RUN npm run dev
# # Serve using a basic static server
# RUN npm install -g serve
# CMD ["serve", "-s", "build", "-l", "3000"]


FROM node:18

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all files
COPY . .

# Build the production-ready app
RUN npm run build

# Install a static server to serve the build
RUN npm install -g serve

# Expose port 8080
EXPOSE 8080

# Serve the app from the "dist" directory
CMD ["serve", "-s", "dist", "-l", "8080"]
