import {
  Body,
  Controller,
  Param,
  Post,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { KeycloakAuthGuard } from '../auth/keycloak-auth.guard';
import { CreateRatingDto } from './dto/create-rating.dto';
import { RatingsService } from './ratings.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('ratings')
@ApiBearerAuth()
@Controller('matches/:matchId/ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @UseGuards(KeycloakAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create rating for a match' })
  @ApiParam({ name: 'matchId', type: 'string' })
  @ApiBody({ type: CreateRatingDto })
  @ApiResponse({ status: 201 })
  async create(
    @Param('matchId', new ParseUUIDPipe({ version: '4' })) matchId: string,
    @Body() body: CreateRatingDto,
  ) {
    return this.ratingsService.create(matchId, body.playerId, body.score, body.comment);
  }
}

