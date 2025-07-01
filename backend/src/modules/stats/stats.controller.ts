import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { KeycloakAuthGuard } from '../auth/keycloak-auth.guard';
import { StatsService } from './stats.service';
import { Request } from 'express';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @UseGuards(KeycloakAuthGuard)
  @Get()
  getStats(@Query('range') range: 'month' | 'season' = 'month', @Req() req: Request) {
    const tenantId = (req as any).tenantId as string;
    return this.statsService.getStats(range, tenantId);
  }
}
