FROM mcr.microsoft.com/devcontainers/go:2-1.25-trixie

# Cài psql client (hữu ích cho debug)
USER root
RUN apt-get update && apt-get install -y --no-install-recommends \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Cache Go modules
# Copy go.mod and go.sum (if exists) from host to container
COPY apps/backend/go.mod apps/backend/go.su* /go/src/app/
# Download dependencies. Since we copy only go.mod/sum, this layer is cached unless dependencies change.
WORKDIR /go/src/app
RUN go mod download

USER vscode
WORKDIR /workspaces