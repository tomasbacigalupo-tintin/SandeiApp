import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
<<<<<<< HEAD
=======
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
>>>>>>> a7433a5 (feat(players): módulo completo con entidad y configuración para migración)
import { Player } from './player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
<<<<<<< HEAD
  controllers: [],
  providers: [],
})
export class PlayersModule {}
=======
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}

>>>>>>> a7433a5 (feat(players): módulo completo con entidad y configuración para migración)
