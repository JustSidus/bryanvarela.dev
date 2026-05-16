FROM node:22-bullseye

# Install system dependencies
RUN apt-get update && apt-get install -y \
    bash \
    git \
    vim \
    curl \
    python3 \
    make \
    g++ \
    libcairo2-dev \
    libjpeg-dev \
    libpango1.0-dev \
    libgif-dev \
    sudo \
    && rm -rf /var/lib/apt/lists/*

# Give node user passwordless sudo
RUN echo "node ALL=(ALL) NOPASSWD:ALL" | tee -a /etc/sudoers

# Install Google Chrome + Playwright dependencies
RUN apt-get update \
    && curl -o /tmp/google-chrome.deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && apt-get install -y /tmp/google-chrome.deb \
    && rm /tmp/google-chrome.deb \
    && rm -rf /var/lib/apt/lists/*

# Install Playwright browsers as node user
USER node
RUN npx playwright install chrome
USER root

# Create workspace and set permissions
RUN mkdir -p /workspaces/bryanvarela.dev && chown -R node:node /workspaces

WORKDIR /workspaces/bryanvarela.dev

# Switch to node user
USER node

# Expose Vite dev server port
EXPOSE 5173
