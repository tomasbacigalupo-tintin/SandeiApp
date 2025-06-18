import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { TacticsService } from './tactics.service';
import { CreateTacticDto } from './dto/create-tactic.dto';
import { Request } from 'express';

@Controller('tactics')
export class TacticsController {
  constructor(private readonly tactics: TacticsService) {}

  @Post()
  create(@Body() dto: CreateTacticDto, @Req() req: Request) {
    const tenantId = (req as any).tenantId as string;
    return this.tactics.create(dto, tenantId);
  }

  @Get()
  findAll(@Req() req: Request) {
    const tenantId = (req as any).tenantId as string;
    return this.tactics.findAll(tenantId);
  }
}
