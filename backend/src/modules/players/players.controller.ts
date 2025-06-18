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
  Req,
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
import { KeycloakAuthGuard } from "../auth/keycloak-auth.guard";
import { PlayersService } from "./players.service";
import { CreatePlayerDto } from "./dto/create-player.dto";
import { UpdatePlayerDto } from "./dto/update-player.dto";
import { Request } from 'express';

@ApiTags('players')
@ApiBearerAuth()
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @UseGuards(KeycloakAuthGuard)
  @Get()
  @ApiOperation({ summary: 'List all players' })
  @ApiResponse({ status: 200, description: 'Array of players returned' })
  findAll(@Req() req: Request) {
    const tenantId = (req as any).tenantId as string;
    return this.playersService.findAll(tenantId);
  }

  @UseGuards(KeycloakAuthGuard)
  @Get('search')
  @ApiOperation({ summary: 'Search players by name' })
  @ApiQuery({ name: 'name', type: String })
  @ApiResponse({ status: 200 })
  search(@Query('name') name: string, @Req() req: Request) {
    const tenantId = (req as any).tenantId as string;
    return this.playersService.searchByName(name, tenantId);
  }

  @UseGuards(KeycloakAuthGuard)
  @Get('position')
  @ApiOperation({ summary: 'Search players by position' })
  @ApiQuery({ name: 'position', type: String })
  @ApiResponse({ status: 200 })
  searchByPosition(@Query('position') position: string, @Req() req: Request) {
    const tenantId = (req as any).tenantId as string;
    return this.playersService.searchByPosition(position, tenantId);
  }

  @UseGuards(KeycloakAuthGuard)
  @Get(':id/average-rating')
  @ApiOperation({ summary: 'Get player average rating' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200 })
  getAverageRating(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Req() req: Request,
  ) {
    const tenantId = (req as any).tenantId as string;
    return this.playersService.getAverageRating(id, tenantId);
  }

  @UseGuards(KeycloakAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get player by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200 })
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Req() req: Request,
  ) {
    const tenantId = (req as any).tenantId as string;
    return this.playersService.findOne(id, tenantId);
  }

  @UseGuards(KeycloakAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create player' })
  @ApiBody({ type: CreatePlayerDto })
  @ApiResponse({ status: 201 })
  create(@Body() body: CreatePlayerDto, @Req() req: Request) {
    const tenantId = (req as any).tenantId as string;
    return this.playersService.create(body, tenantId);
  }

  @UseGuards(KeycloakAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update player' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdatePlayerDto })
  @ApiResponse({ status: 200 })
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() body: UpdatePlayerDto,
    @Req() req: Request,
  ) {
    const tenantId = (req as any).tenantId as string;
    return this.playersService.update(id, tenantId, body);
  }

  @UseGuards(KeycloakAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete player' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200 })
  async remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Req() req: Request,
  ) {
    const tenantId = (req as any).tenantId as string;
    await this.playersService.remove(id, tenantId);
    return { success: true };
  }
}
