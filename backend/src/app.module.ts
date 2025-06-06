import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { typeOrmConfig } from "./config/typeorm.config";
import { PlayersModule } from "./modules/players/players.module";
import { AuthModule } from "./modules/auth/auth.module";
import { MatchesModule } from "./modules/matches/matches.module";
import { RatingsModule } from "./modules/ratings/ratings.module";
import { FormationsModule } from "./modules/formations/formations.module";
import { IaModule } from "./modules/ia/ia.module";
import { HealthModule } from "./modules/health/health.module";
import { StatsModule } from "./modules/stats/stats.module";
import { DemoModule } from "./modules/demo/demo.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    PlayersModule,
    MatchesModule,
    RatingsModule,
    FormationsModule,
    IaModule,
    HealthModule,
    StatsModule,
    DemoModule,
  ],
})
export class AppModule {}
