import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  findAll() {
    return this.playersService.findAll();
  }

  @Post()
  create(@Body() body: CreatePlayerDto) {
    return this.playersService.create(body);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() body: UpdatePlayerDto,
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
