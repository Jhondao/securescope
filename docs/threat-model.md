# Modelo de amenazas — SecureScope (v0.1)

Un modelo de amenazas responde cuatro preguntas: ¿qué estamos construyendo?, ¿qué puede salir mal?, ¿qué vamos a hacer al respecto? y ¿lo hicimos bien? Este documento se actualiza al final de cada fase.

## 1. Qué estamos construyendo

```
[Navegador] --HTTPS--> [Web: Next.js] --GraphQL--> [API: Node + Apollo]
                                                     |        |         |
                                               [PostgreSQL] [OSV API] [API de IA]
                                                     |
                                              [Motor de escaneo] --HTTP(S)--> [Sitios de los usuarios]
```

**Activos que hay que proteger:**

- Cuentas y contraseñas de los usuarios.
- Los resultados de los escaneos: revelan las debilidades de los sitios de nuestros usuarios.
- Las credenciales del servidor: base de datos, clave de la API de IA y credenciales de AWS.
- La reputación del servicio: que no lo usen para atacar a terceros.

**Límites de confianza** (donde los datos cruzan de "no confiable" a "confiable"):

1. Navegador → API: todo lo que llega del cliente es no confiable.
2. Motor de escaneo → Internet: las respuestas de los sitios escaneados son no confiables.
3. API → IA: lo que devuelve el modelo es no confiable.

## 2. Qué puede salir mal (STRIDE)

| Categoría                         | Amenaza concreta                                                       | Mitigación prevista                                                                   | Fase |
| --------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ---- |
| **S**poofing (suplantación)       | Alguien inicia sesión como otro usuario (fuerza bruta, robo de cookie) | Argon2, límite de intentos, cookies HttpOnly + Secure + SameSite                      | 1    |
| **S**poofing                      | Un usuario escanea un dominio que no es suyo                           | Verificación de propiedad por DNS TXT o `/.well-known/`                               | 2    |
| **T**ampering (alteración)        | Se modifican resultados o puntajes                                     | Autorización por resolver; el puntaje se calcula solo en el servidor                  | 1–2  |
| **R**epudiation (repudio)         | Alguien niega haber lanzado un escaneo abusivo                         | Registro de auditoría: quién, qué dominio, cuándo y desde qué IP                      | 2    |
| **I**nformation disclosure (fuga) | Un usuario ve los hallazgos de otro (IDOR)                             | Filtrar siempre por `userId` de la sesión; pruebas que lo intenten                    | 1    |
| **I**nformation disclosure        | SSRF: el escáner lee la red interna o los metadatos de AWS             | Bloqueo de IP privadas, validación tras redirecciones, IP fijada, solo puertos 80/443 | 2    |
| **I**nformation disclosure        | Se filtran secretos en el repositorio o en logs                        | `.env` fuera de Git, GitHub Secrets, no registrar tokens                              | 0, 5 |
| **D**enial of service             | Consultas GraphQL gigantes o escaneos masivos                          | Límite de profundidad y complejidad, límite de peticiones por usuario, tiempos límite | 1–2  |
| **D**enial of service             | Un sitio responde lento o con un archivo enorme                        | Tiempo límite y tamaño máximo de respuesta                                            | 2    |
| **E**levation of privilege        | Un usuario normal ejecuta acciones de administrador                    | Roles revisados en el servidor, nunca solo en el frontend                             | 1    |
| **E**levation of privilege        | Inyección de prompts que cambia el comportamiento de la IA             | Enviar solo datos estructurados; la IA explica pero no decide                         | 4    |
| **E**levation of privilege        | Una dependencia vulnerable o maliciosa                                 | Lockfile, `pnpm audit`, Dependabot y CodeQL en CI                                     | 5    |
| **I**nformation disclosure | Servidores de desarrollo expuestos en la red local | Escuchar solo en 127.0.0.1 (variable `HOST`) | 0 |

## 3. Riesgos aceptados por ahora

- Sin MFA en la versión 1: se documenta como mejora futura.
- Los escaneos corren en el mismo proceso que la API. Una cola separada queda para los extras.

## 4. ¿Lo hicimos bien?

Al final de cada fase, revisa esta tabla: marca lo que ya está mitigado y enlaza la prueba que lo demuestra.
