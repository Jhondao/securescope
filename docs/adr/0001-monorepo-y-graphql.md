# ADR 0001 — Monorepo con pnpm y API en GraphQL

- **Estado:** aceptada
- **Fecha:** 2026-11-23

## Contexto

SecureScope tiene un frontend (Next.js) y una API (Node). Ambos comparten tipos, como los del resultado de un escaneo. Es un proyecto de una sola persona que debe demostrar habilidades de backend, GraphQL y CI/CD.

## Decisión

1. **Monorepo con pnpm workspaces** (`apps/web` y `apps/api`) en un solo repositorio.
2. **API separada en Node con GraphQL (Apollo Server)**, en lugar de usar solo las rutas de API de Next.js.

## Alternativas consideradas

| Alternativa                                    | Por qué no                                                                  |
| ---------------------------------------------- | --------------------------------------------------------------------------- |
| Dos repositorios separados                     | Duplica configuración y CI, y complica compartir tipos                      |
| Solo Next.js (Route Handlers o Server Actions) | Más simple, pero no demuestra un backend independiente ni GraphQL           |
| API REST                                       | Ya tengo experiencia con REST; GraphQL es una brecha que piden las vacantes |

## Consecuencias

- **A favor:** un solo `pnpm install`, cambios atómicos entre frontend y API, un único pipeline de CI.
- **En contra:** GraphQL añade riesgos propios (consultas muy profundas, introspección expuesta) que hay que mitigar. Ver el modelo de amenazas.
