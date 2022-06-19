import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
  imports: [JogadoresModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
