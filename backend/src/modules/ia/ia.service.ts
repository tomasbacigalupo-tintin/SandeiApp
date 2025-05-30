import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { LineupResponseDto } from './dto/lineup-response.dto';
import { TacticsResponseDto } from './dto/tactics-response.dto';
import { ErrorDetectionResponseDto } from './dto/error-detection-response.dto';

@Injectable()
export class IaService {
  private readonly logger = new Logger(IaService.name);
  constructor(private readonly http: HttpService) {}

  async suggestLineup(
    players: string[],
    formation: string,
  ): Promise<LineupResponseDto> {
    try {
      const response = await firstValueFrom(
        this.http.post('/ia/suggest_lineup', { players, formation }),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Failed to suggest lineup', error as Error);
      throw error;
    }
  }

  async suggestTactics(
    players: string[],
    style?: string,
  ): Promise<TacticsResponseDto> {
    try {
      const response = await firstValueFrom(
        this.http.post('/ia/suggest_tactics', { players, style }),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Failed to suggest tactics', error as Error);
      throw error;
    }
  }

  async predictMatch(
    homeTeam: string[],
    awayTeam: string[],
  ): Promise<{ prediction: string }> {
    try {
      const response = await firstValueFrom(
        this.http.post('/ia/predict_match', {
          home_team: homeTeam,
          away_team: awayTeam,
        }),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Failed to predict match', error as Error);
      throw error;
    }
  }

  async detectErrors(
    lineup: string[],
    formation?: string,
  ): Promise<ErrorDetectionResponseDto> {
    try {
      const response = await firstValueFrom(
        this.http.post('/ia/detect_errors', { lineup, formation }),
      );
      return response.data;
    } catch (error) {
      this.logger.error('Failed to detect errors', error as Error);
      throw error;
    }
  }
}
