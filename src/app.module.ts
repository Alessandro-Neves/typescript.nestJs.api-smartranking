import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://root:root@cluster0.eutjp.mongodb.net/smartranking?retryWrites=true&w=majority',
      {
        useNewUrlParser: true, 
        useUnifiedTopology: true 
      }
    ),
    JogadoresModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
