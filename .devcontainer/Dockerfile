FROM mcr.microsoft.com/devcontainers/go:2-1.25-trixie

# Cài psql client (hữu ích cho debug)
USER root
RUN apt-get update && apt-get install -y --no-install-recommends \
    postgresql-client \
 && rm -rf /var/lib/apt/lists/*

USER vscode
WORKDIR /workspaces