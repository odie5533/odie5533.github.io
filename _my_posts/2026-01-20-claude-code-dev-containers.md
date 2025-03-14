---
layout: post
title: "Dangerboxing: Claude Code in a Dev Container"
date: 2026-01-20 00:00:00
description: Skipping permission prompts by using a Dev Container.
tags: claude devcontainers dangerboxing
categories: programming
---

Like the One Ring, `--dangerously-skip-permissions` is powerful and tempting. But without adequate precautions, AI Agents could accidentally exfiltrate data, mess with other files on your system, or run bad migrations against any sets of credentials it happens to find. Sandbox tools exist for this purpose like Vagrant, VirtualBox, and Bubblewrap. All can work, though some are heavy and others are better suited for things like programmatically creating sandboxes.

Between them though is a lightweight option that VS Code supports: Dev Containers. A Dev Container is a Docker image that you run locally and it mounts your repo inside it. It integrates seamlessly with VS Code, so you don’t even know you’re in a Docker container. Ports work, debugging works, Github Copilot works, extensions all work still, but it keeps it all separated from your host system. It’s the perfect way to safely run Claude Code dangerously without the danger.

<div class="text-center">
{% include figure.liquid loading="lazy" path="assets/img/my-posts-images/2026-01-20-claude-code-dev-containers/i-would-use-it-from-a-desire-to-do-good.jpg" title="I would use it from a desire to do good" class="img-fluid rounded z-depth-1" max-width="500px" %}
</div>

## File layout

```
dashboard/
└── .devcontainer/
   ├── devcontainer.json
   ├── docker-compose.yml
   ├── Dockerfile
   └── init-firewall.sh
```

### init-firewall.sh

This script adds a strict firewall to the container.

It's available at <a target="_blank" href="https://github.com/anthropics/claude-code/blob/main/.devcontainer/init-firewall.sh">https://github.com/anthropics/claude-code/blob/main/.devcontainer/init-firewall.sh</a>.

### devcontainer.json

```json
{
  "name": "Dashboard",
  "dockerComposeFile": "docker-compose.yml",
  "service": "app",
  "workspaceFolder": "/workspace",
  "remoteUser": "vscode",
  "customizations": {
    "vscode": {
      "extensions": [
        "anthropic.claude-code",
        "ms-python.python",
        "ms-python.vscode-pylance",
        "charliermarsh.ruff",
        "eamodio.gitlens"
      ],
      "settings": {
        "python.defaultInterpreterPath": "/workspace/.venv/bin/python",
        "editor.formatOnSave": true
      }
    }
  },
  "postStartCommand": "sudo /usr/local/bin/init-firewall.sh",
  "waitFor": "postStartCommand"
}
```

### docker-compose.yml

```yaml
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    volumes:
      - ..:/workspace:cached
      - commandhistory:/commandhistory
      - claude-config:/home/vscode/.claude
    command: sleep infinity
    environment:
      CLAUDE_CONFIG_DIR: /home/vscode/.claude
    cap_add:
      - NET_ADMIN
      - NET_RAW

  postgres:
    image: postgres:16
    restart: unless-stopped
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
volumes:
  postgres_data:
  commandhistory:
  claude-config:
```

### Dockerfile

```dockerfile
FROM mcr.microsoft.com/devcontainers/python:3.11

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    # Firewall tools
    iptables \
    ipset \
    iproute2 \
    dnsutils \
    aggregate \
    # Build tools for compiling packages
    build-essential \
    pkg-config \
    # PostgreSQL client and dev headers
    postgresql-client \
    libpq-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Node.js 20
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean && rm -rf /var/lib/apt/lists/*
# Install pnpm globally
RUN npm install -g pnpm

# Persist bash history
RUN SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" \
    && mkdir /commandhistory \
    && touch /commandhistory/.bash_history \
    && chown -R vscode /commandhistory \
    && echo "$SNIPPET" >> /home/vscode/.bashrc

# Create Claude config directory with correct ownership (for auth persistence)
RUN mkdir -p /home/vscode/.claude \
    && chown -R vscode:vscode /home/vscode/.claude

USER vscode
# Install Claude Code
RUN curl -fsSL https://claude.ai/install.sh | bash
# Install uv (Python package manager) for vscode user
RUN curl -LsSf https://astral.sh/uv/install.sh | sh
ENV PATH="/home/vscode/.local/bin:$PATH"
# Enable if you want to use Playwright
# RUN uvx playwright install-deps chromium

# Copy and set up firewall script
USER root
COPY init-firewall.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/init-firewall.sh \
    && echo "vscode ALL=(root) NOPASSWD: /usr/local/bin/init-firewall.sh" > /etc/sudoers.d/vscode-firewall \
    && chmod 0440 /etc/sudoers.d/vscode-firewall

USER vscode
```

### Troubleshooting

> [+] Running 2/2  
 ✔ Container dashboard_devcontainer-app-1       Started               0.3s   
 ✔ Container dashboard_devcontainer-postgres-1  Running               0.0s

If your Dev Container hangs at building/startup, make sure you have the latest Dev Containers extension.
Old versions of the extension have a bug that causes it to hang. I ran into this issue on both
VS Code and Cursor. On Cursor, I had to switch to the Anysphere version of the extension.

# Resources

- <a target="_blank" href="https://code.claude.com/docs/en/devcontainer">https://code.claude.com/docs/en/devcontainer</a>
