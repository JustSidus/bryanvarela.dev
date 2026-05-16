FROM node:22-alpine

# Install system dependencies
RUN apk add --no-cache \
    bash \
    git \
    vim \
    curl \
    python3 \
    make \
    g++ \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    giflib

# Create workspace and set permissions
RUN mkdir -p /workspaces/bryanvarela.dev && chown -R node:node /workspaces

WORKDIR /workspaces/bryanvarela.dev

# Switch to node user
USER node

# Expose Vite dev server port
EXPOSE 5173