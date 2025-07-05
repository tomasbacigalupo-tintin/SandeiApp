import { CanActivate, Injectable } from '@nestjs/common';

@Injectable()
export class KeycloakAuthGuard implements CanActivate {
  canActivate(): boolean {
    return true;
  }
}
