import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criarJogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresServive: JogadoresService) {}

    @Post()
    async criarAtualizarJogador(
        @Body() criarJogadorDto: CriarJogadorDto 
    ) {
        await this.jogadoresServive.criarAtualizarJogador(criarJogadorDto)
    }

    @Get()
    async consultarJogadores(
        @Query('email') email: string
    ): Promise<Jogador | Jogador[]>{
        if (email) {
            return this.jogadoresServive.consultarJogadoresPeloEmail(email)
        } else {
            return this.jogadoresServive.consultarTodosJogadores()
        }
    }

    @Delete()
    async deletarJogador(
        @Query('email') email: string
    ): Promise<void> {
        return this.jogadoresServive.deletarJogador(email)
    }
}
