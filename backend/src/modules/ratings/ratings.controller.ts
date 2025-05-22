import {
  Body,
  Controller,
  Param,
  Post,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateRatingDto } from './dto/create-rating.dto';
import { RatingsService } from './ratings.service';

@Controller('matches/:matchId/ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Param('matchId', new ParseUUIDPipe({ version: '4' })) matchId: string,
    @Body() body: CreateRatingDto,
  ) {
    return this.ratingsService.create(matchId, body.playerId, body.score, body.comment);
  }
}

