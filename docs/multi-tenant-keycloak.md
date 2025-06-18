# Multi-tenant y Keycloak

Este repositorio incorpora soporte básico multi-tenant y autenticación con Keycloak.

## Multi-tenant

- Se añadió la entidad base `TenantEntity` que incluye la columna `tenantId` para todas las tablas principales.
- Se agregó `TenantMiddleware` que lee `X-Tenant-ID` de la cabecera y lo asigna a la petición.
- Los módulos de jugadores y partidos aplican filtros por `tenantId`.
- Nueva migración `AddTenantId1747088295099` añade la columna a las tablas existentes.

## Keycloak

- Se integró el paquete `nest-keycloak-connect`.
- Nuevo módulo `KeycloakModule` configura el cliente según variables de entorno.
- `KeycloakAuthGuard` reemplaza al guard de JWT en los controladores.

Las variables de entorno necesarias son:

```
KEYCLOAK_URL=http://localhost:8080
KEYCLOAK_REALM=sandei
KEYCLOAK_CLIENT_ID=sandei-backend
KEYCLOAK_CLIENT_SECRET=changeme
```

Para pruebas locales se puede continuar usando JWT si Keycloak no está disponible.
