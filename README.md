# SecureScope

Escáner de seguridad para sitios web propios: revisa cabeceras HTTP, TLS, cookies y dependencias, asigna un puntaje y explica con IA cómo corregir cada hallazgo.

> Estado: **fase 0 — base del proyecto.** Plan completo de 16 semanas en construcción.

## Stack

Next.js · TypeScript · Node.js · GraphQL (Apollo) · PostgreSQL · Prisma · Docker · GitHub Actions · AWS

## Estructura

```
securescope/
├── apps/
│   ├── web/          # Frontend en Next.js
│   └── api/          # API en Node.js (GraphQL desde la fase 1)
├── docs/
│   ├── threat-model.md   # Modelo de amenazas (STRIDE)
│   └── adr/              # Registros de decisiones de arquitectura
├── docker-compose.yml    # PostgreSQL local
└── pnpm-workspace.yaml
```

## Cómo ejecutarlo

Requisitos: Node.js 22+, pnpm 10+ y Docker.

```bash
pnpm install
cp .env.example .env        # y cambia la contraseña
docker compose up -d        # levanta PostgreSQL
pnpm dev                    # web en :3000 y API en :4000
```

Comprueba la API: `curl http://localhost:4000/health`

## Seguridad

El diseño parte de un [modelo de amenazas](docs/threat-model.md). Las decisiones técnicas están en [docs/adr](docs/adr).
