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

@Controller("formations")
export class FormationsController {
  constructor(private readonly formationsService: FormationsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.formationsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  // Create a new tactical formation
  create(@Body() body: CreateFormationDto) {
    return this.formationsService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  async update(
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
    @Body() body: any,
  ) {
    const formation = await this.formationsService.update(id, body);
    if (!formation) throw new NotFoundException("Formation not found");
    return formation;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async remove(@Param("id", new ParseUUIDPipe({ version: "4" })) id: string) {
    const formation = await this.formationsService.remove(id);
    if (!formation) throw new NotFoundException("Formation not found");
    return { success: true };
  }
}
