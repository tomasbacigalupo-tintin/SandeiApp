import { Body, Controller, Param, Post } from '@nestjs/common';
import { RatingsService } from './ratings.service';

@Controller('matches/:matchId/ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  async create(
    @Param('matchId') matchId: string,
    @Body() body: { playerId: string; score: number; comment?: string },
  ) {
    return this.ratingsService.create(matchId, body.playerId, body.score, body.comment);
  }
}

