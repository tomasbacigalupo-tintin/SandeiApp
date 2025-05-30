import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { PlayersService } from "./players.service";
import { CreatePlayerDto } from "./dto/create-player.dto";
import { UpdatePlayerDto } from "./dto/update-player.dto";

@Controller("players")
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.playersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('search')
  search(@Query('name') name: string) {
    return this.playersService.searchByName(name);
  }

  @UseGuards(JwtAuthGuard)
  @Get('position')
  searchByPosition(@Query('position') position: string) {
    return this.playersService.searchByPosition(position);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/average-rating')
  getAverageRating(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.playersService.getAverageRating(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  async findOne(@Param("id", new ParseUUIDPipe({ version: "4" })) id: string) {
    return this.playersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: CreatePlayerDto) {
    return this.playersService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  async update(
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
    @Body() body: UpdatePlayerDto,
  ) {
    return this.playersService.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async remove(@Param("id", new ParseUUIDPipe({ version: "4" })) id: string) {
    await this.playersService.remove(id);
    return { success: true };
  }
}
