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
import { MatchesService } from "./matches.service";
import { CreateMatchDto } from "./dto/create-match.dto";
import { UpdateMatchDto } from "./dto/update-match.dto";
import { Match } from "./match.entity";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("matches")
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.matchesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  async findOne(@Param("id", new ParseUUIDPipe({ version: "4" })) id: string) {
    const match = await this.matchesService.findById(id);
    if (!match) throw new NotFoundException("Match not found");
    return match;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: CreateMatchDto) {
    const data = {
      ...body,
      date: new Date(body.date),
    } as Partial<Match>;
    return this.matchesService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  async update(
    @Param("id", new ParseUUIDPipe({ version: "4" })) id: string,
    @Body() body: UpdateMatchDto,
  ) {
    const data: Partial<Match> = body.date
      ? { ...body, date: new Date(body.date) }
      : body;
    const match = await this.matchesService.update(id, data);
    if (!match) throw new NotFoundException("Match not found");
    return match;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async remove(@Param("id", new ParseUUIDPipe({ version: "4" })) id: string) {
    const match = await this.matchesService.remove(id);
    if (!match) throw new NotFoundException("Match not found");
    return { success: true };
  }
}
