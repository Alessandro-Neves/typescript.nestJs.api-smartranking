import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criarJogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v1 as uuid } from 'uuid'

@Injectable()
export class JogadoresService {
    private jogadores: Jogador[] = []

    private readonly logger = new Logger(JogadoresService.name)

    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
        const { email } = criarJogadorDto

        const jogadorEncontrado = this.jogadores.find( jogador => jogador.email === email)

        if(jogadorEncontrado) {
            return this.atualizar(jogadorEncontrado, criarJogadorDto)
        } else {
            this.criar(criarJogadorDto)
        }
    }

    private atualizar(jogadorEncontrado: Jogador, criarJogadorDto: CriarJogadorDto): void {
        const { nome, telefoneCelular } = criarJogadorDto
        jogadorEncontrado.nome = nome
        jogadorEncontrado.telefone = telefoneCelular
    }

    private criar(criarJogadorDto: CriarJogadorDto): void {
        const { nome, telefoneCelular, email } = criarJogadorDto

        const jogador: Jogador = {
            _id: uuid(),
            nome,
            email,
            telefone: telefoneCelular,
            ranking: 'A',
            posicaoRanking: 1,
            urlFotoJogador: 'www.google.com.br/foto123.jpg',
        }

        this.jogadores.push(jogador)
        this.logger.log(`criaJogadorDto: ${JSON.stringify(jogador)}`)
    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return this.jogadores;
    }

    async consultarJogadoresPeloEmail(email: string): Promise<Jogador> {
        const jogadorEncontrado = this.jogadores.find( jogador => jogador.email === email)

        if(jogadorEncontrado) {
            return jogadorEncontrado
        } else {
            throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`)
        }
    }

    async deletarJogador(email: string): Promise<void> {
        const jogadorEncontrado = this.jogadores.find( jogador => jogador.email === email)
        
        if(jogadorEncontrado) {
            this.jogadores = this.jogadores.filter( jogador => jogador.email !== email)
        } else {
            throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`)
        }
    }
}
