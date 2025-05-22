import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { IaService } from './ia.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LineupRequestDto } from './dto/lineup-request.dto';
import { LineupResponseDto } from './dto/lineup-response.dto';

@Controller('ia')
export class IaController {
  constructor(private readonly iaService: IaService) {}

  @UseGuards(JwtAuthGuard)
  @Post('suggest_lineup')
  suggestLineup(@Body() body: LineupRequestDto): Promise<LineupResponseDto> {
    return this.iaService.suggestLineup(body.players, body.formation);
  }
}
