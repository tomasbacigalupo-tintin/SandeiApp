import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  NotFoundException,
  UseGuards,
} from "@nestjs/common";
import { FormationsService } from "./formations.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateFormationDto } from "./dto/create-formation.dto";
import { UpdateFormationDto } from "./dto/update-formation.dto";
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('formations')
@ApiBearerAuth()
@Controller('formations')
export class FormationsController {
  constructor(private readonly formationsService: FormationsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'List formations' })
  @ApiResponse({ status: 200 })
  findAll() {
    return this.formationsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get formation by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200 })
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const formation = await this.formationsService.findById(id);
    if (!formation) throw new NotFoundException("Formation not found");
    return formation;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  // Create a new tactical formation
  @ApiOperation({ summary: 'Create formation' })
  @ApiBody({ type: CreateFormationDto })
  @ApiResponse({ status: 201 })
  create(@Body() body: CreateFormationDto) {
    return this.formationsService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update formation' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateFormationDto })
  @ApiResponse({ status: 200 })
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() body: UpdateFormationDto,
  ) {
    const formation = await this.formationsService.update(id, body);
    if (!formation) throw new NotFoundException("Formation not found");
    return formation;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete formation' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200 })
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const formation = await this.formationsService.remove(id);
    if (!formation) throw new NotFoundException("Formation not found");
    return { success: true };
  }
}
