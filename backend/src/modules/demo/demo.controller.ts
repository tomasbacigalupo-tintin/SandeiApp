import { Controller, Post, UseGuards } from '@nestjs/common';
import { DemoService } from './demo.service';
import { KeycloakAuthGuard } from '../auth/keycloak-auth.guard';

@Controller('demo')
export class DemoController {
  constructor(private readonly demo: DemoService) {}

  @UseGuards(KeycloakAuthGuard)
  @Post()
  createDemo() {
    return this.demo.createDemoData();
  }
}
