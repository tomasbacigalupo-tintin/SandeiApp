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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { PlayersService } from "./players.service";
import { CreatePlayerDto } from "./dto/create-player.dto";
import { UpdatePlayerDto } from "./dto/update-player.dto";

@ApiTags('players')
@ApiBearerAuth()
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'List all players' })
  @ApiResponse({ status: 200, description: 'Array of players returned' })
  findAll() {
    return this.playersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('search')
  @ApiOperation({ summary: 'Search players by name' })
  @ApiQuery({ name: 'name', type: String })
  @ApiResponse({ status: 200 })
  search(@Query('name') name: string) {
    return this.playersService.searchByName(name);
  }

  @UseGuards(JwtAuthGuard)
  @Get('position')
  @ApiOperation({ summary: 'Search players by position' })
  @ApiQuery({ name: 'position', type: String })
  @ApiResponse({ status: 200 })
  searchByPosition(@Query('position') position: string) {
    return this.playersService.searchByPosition(position);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/average-rating')
  @ApiOperation({ summary: 'Get player average rating' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200 })
  getAverageRating(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.playersService.getAverageRating(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get player by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200 })
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.playersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create player' })
  @ApiBody({ type: CreatePlayerDto })
  @ApiResponse({ status: 201 })
  create(@Body() body: CreatePlayerDto) {
    return this.playersService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update player' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdatePlayerDto })
  @ApiResponse({ status: 200 })
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() body: UpdatePlayerDto,
  ) {
    return this.playersService.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete player' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200 })
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    await this.playersService.remove(id);
    return { success: true };
  }
}
