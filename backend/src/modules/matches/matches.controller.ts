import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  UseGuards,
  Req,
} from "@nestjs/common";
import { MatchesService } from "./matches.service";
import { CreateMatchDto } from "./dto/create-match.dto";
import { UpdateMatchDto } from "./dto/update-match.dto";
import { Request } from 'express';
import { KeycloakAuthGuard } from "../auth/keycloak-auth.guard";

@Controller("matches")
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @UseGuards(KeycloakAuthGuard)
  @Get()
  findAll(@Req() req: Request) {
    const tenantId = (req as any).tenantId as string;
    return this.matchesService.findAll(tenantId);
  }

  @UseGuards(KeycloakAuthGuard)
  @Get(":id")
  async findOne(
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
    @Req() req: Request,
  ) {
    const tenantId = (req as any).tenantId as string;
    return this.matchesService.findById(id, tenantId);
  }

  @UseGuards(KeycloakAuthGuard)
  @Post()
  create(@Body() body: CreateMatchDto, @Req() req: Request) {
    const tenantId = (req as any).tenantId as string;
    return this.matchesService.create(body, tenantId);
  }

  @UseGuards(KeycloakAuthGuard)
  @Put(":id")
  async update(
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
    @Body() body: UpdateMatchDto,
    @Req() req: Request,
  ) {
    const tenantId = (req as any).tenantId as string;
    return this.matchesService.update(id, tenantId, body);
  }

  @UseGuards(KeycloakAuthGuard)
  @Delete(":id")
  async remove(
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
    @Req() req: Request,
  ) {
    const tenantId = (req as any).tenantId as string;
    await this.matchesService.remove(id, tenantId);
    return { success: true };
  }
}
