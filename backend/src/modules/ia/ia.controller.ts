import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { IaService } from './ia.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LineupRequestDto } from './dto/lineup-request.dto';
import { LineupResponseDto } from './dto/lineup-response.dto';
import { TacticsRequestDto } from './dto/tactics-request.dto';
import { TacticsResponseDto } from './dto/tactics-response.dto';
import { MatchPredictionRequestDto } from './dto/match-prediction-request.dto';
import { MatchPredictionResponseDto } from './dto/match-prediction-response.dto';

@Controller('ia')
export class IaController {
  constructor(private readonly iaService: IaService) {}

  @UseGuards(JwtAuthGuard)
  @Post('suggest_lineup')
  suggestLineup(@Body() body: LineupRequestDto): Promise<LineupResponseDto> {
    return this.iaService.suggestLineup(body.players, body.formation);
  }

  @UseGuards(JwtAuthGuard)
  @Post('suggest_tactics')
  suggestTactics(@Body() body: TacticsRequestDto): Promise<TacticsResponseDto> {
    return this.iaService.suggestTactics(body.players, body.style);
  }

  @UseGuards(JwtAuthGuard)
  @Post('predict_match')
  predictMatch(
    @Body() body: MatchPredictionRequestDto,
  ): Promise<MatchPredictionResponseDto> {
    return this.iaService.predictMatch(body.homeTeam, body.awayTeam);
  }
}
