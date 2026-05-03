# Stage 1: Build the Vite app
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files first for better Docker layer caching
COPY package.json package-lock.json* ./

# Use npm install (not npm ci) to avoid lockfile sync issues
RUN npm install

# Copy the rest of the source code
COPY . .

# Accept VITE_API_URL as a build argument from Railway
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build the Vite production bundle
RUN npm run build

# Stage 2: Serve with a lightweight static server
FROM node:20-alpine AS production

WORKDIR /app

# Install serve globally
RUN npm install -g serve@14

# Copy only the built output from the build stage
COPY --from=build /app/dist ./dist

# Railway injects PORT as an env variable
ENV PORT=3000
EXPOSE 3000

# Serve the SPA (-s enables single-page-app mode for React Router)
CMD ["sh", "-c", "serve -s dist -l tcp://0.0.0.0:$PORT"]
