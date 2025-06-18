import { Module } from '@nestjs/common';
import { KeycloakConnectModule } from 'nest-keycloak-connect';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    KeycloakConnectModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        authServerUrl: config.get('KEYCLOAK_URL'),
        realm: config.get('KEYCLOAK_REALM'),
        clientId: config.get('KEYCLOAK_CLIENT_ID'),
        secret: config.getOrThrow('KEYCLOAK_CLIENT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [KeycloakConnectModule],
})
export class KeycloakModule {}
