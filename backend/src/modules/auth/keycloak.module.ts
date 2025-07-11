import { Module } from '@nestjs/common';
import { KeycloakConnectModule } from 'nest-keycloak-connect';

/**
 * Configures the KeycloakConnectModule using environment variables. The module
 * still loads with empty values so unit tests can run without a Keycloak server.
 */
@Module({
  imports: [
    KeycloakConnectModule.register({
      authServerUrl: process.env.KEYCLOAK_URL || '',
      realm: process.env.KEYCLOAK_REALM || '',
      clientId: process.env.KEYCLOAK_CLIENT_ID || '',
      secret: process.env.KEYCLOAK_CLIENT_SECRET || '',
    }),
  ],
  exports: [KeycloakConnectModule],
})
export class KeycloakModule {}
