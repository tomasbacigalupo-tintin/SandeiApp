import { Body, Controller, Post } from '@nestjs/common';
import { IaService } from './ia.service';
import { LineupRequestDto } from './dto/lineup-request.dto';
import { LineupResponseDto } from './dto/lineup-response.dto';
import { TacticsRequestDto } from './dto/tactics-request.dto';
import { TacticsResponseDto } from './dto/tactics-response.dto';
import { MatchPredictionRequestDto } from './dto/match-prediction-request.dto';
import { MatchPredictionResponseDto } from './dto/match-prediction-response.dto';
import { ErrorDetectionRequestDto } from './dto/error-detection-request.dto';
import { ErrorDetectionResponseDto } from './dto/error-detection-response.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('ia')
@ApiBearerAuth()
@Controller('ia')
export class IaController {
  constructor(private readonly iaService: IaService) {}

  @Post('suggest_lineup')
  @ApiOperation({ summary: 'Suggest lineup using AI' })
  @ApiBody({ type: LineupRequestDto })
  @ApiResponse({ status: 201, type: LineupResponseDto })
  suggestLineup(@Body() body: LineupRequestDto): Promise<LineupResponseDto> {
    return this.iaService.suggestLineup(body.players, body.formation);
  }

  @Post('suggest_tactics')
  @ApiOperation({ summary: 'Suggest tactics using AI' })
  @ApiBody({ type: TacticsRequestDto })
  @ApiResponse({ status: 201, type: TacticsResponseDto })
  suggestTactics(@Body() body: TacticsRequestDto): Promise<TacticsResponseDto> {
    return this.iaService.suggestTactics(body.players, body.style);
  }

  @Post('predict_match')
  @ApiOperation({ summary: 'Predict match result with AI' })
  @ApiBody({ type: MatchPredictionRequestDto })
  @ApiResponse({ status: 201, type: MatchPredictionResponseDto })
  predictMatch(
    @Body() body: MatchPredictionRequestDto,
  ): Promise<MatchPredictionResponseDto> {
    return this.iaService.predictMatch(body.homeTeam, body.awayTeam);
  }

  @Post('detect_errors')
  @ApiOperation({ summary: 'Detect lineup errors with AI' })
  @ApiBody({ type: ErrorDetectionRequestDto })
  @ApiResponse({ status: 201, type: ErrorDetectionResponseDto })
  detectErrors(
    @Body() body: ErrorDetectionRequestDto,
  ): Promise<ErrorDetectionResponseDto> {
    return this.iaService.detectErrors(body.lineup, body.formation);
  }
}

