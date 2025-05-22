import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  BadRequestException,
  NotFoundException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  findAll() {
    return this.playersService.findAll();
  }

  @Post()
  create(
    @Body() body: { name: string; position?: string; score?: number },
  ) {
    if (!body.name) throw new BadRequestException('name is required');
    return this.playersService.create(body);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() body: { name?: string; position?: string; score?: number },
  ) {
    const player = await this.playersService.update(id, body);
    if (!player) throw new NotFoundException('Player not found');
    return player;
  }

  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const deleted = await this.playersService.remove(id);
    if (!deleted) throw new NotFoundException('Player not found');
    return { success: true };
  }
}
