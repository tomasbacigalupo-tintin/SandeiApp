import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { LineupResponseDto } from './dto/lineup-response.dto';

@Injectable()
export class IaService {
  constructor(private readonly http: HttpService) {}

  async suggestLineup(
    players: string[],
    formation: string,
  ): Promise<LineupResponseDto> {
    const response = await firstValueFrom(
      this.http.post('/ia/suggest_lineup', { players, formation }),
    );
    return response.data;
  }
}
