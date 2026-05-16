## Development Setup

### Reopen in Container
1. VS Code detectará `.devcontainer/`
2. Click "Reopen in Container"
3.listo - el proyecto arranca en `http://localhost:5173`

### Manual (sin VS Code)
```bash
docker-compose up --build
```
Acceso: http://localhost:5173

### Production (verificar build antes de push)
```bash
docker build -t portfolio-prod .
docker run -p 8080:80 portfolio-prod
```
Acceso: http://localhost:8080

### Cleanup
```bash
docker-compose down
docker system prune -f
```

## Notas
- Hot reload funciona via volúmenes Docker
- `server.watch.usePolling: true` en vite.config.js habilita hot reload en containers
- El Dev Container usa usuario `node` (no root)