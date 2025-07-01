import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { Request } from 'express';
import { ScoutingService } from './scouting.service';
import { CreateScoutedPlayerDto } from './dto/create-scouted-player.dto';

@Controller('scouting')
export class ScoutingController {
  constructor(private readonly service: ScoutingService) {}

  @Post('players')
  create(@Body() dto: CreateScoutedPlayerDto, @Req() req: Request) {
    const tenantId = (req as any).tenantId as string;
    return this.service.create(dto, tenantId);
  }

  @Get('players')
  findAll(@Req() req: Request) {
    const tenantId = (req as any).tenantId as string;
    return this.service.findAll(tenantId);
  }
}
