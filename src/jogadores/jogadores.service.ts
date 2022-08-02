import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criarJogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v1 as uuid } from 'uuid'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';

@Injectable()
export class JogadoresService {

    constructor(
        @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>
    ) {}

    private jogadores: Jogador[] = []

    private readonly logger = new Logger(JogadoresService.name)

    private async atualizar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        return await this.jogadorModel.findOneAndUpdate({email: criarJogadorDto.email}, {$set: criarJogadorDto}).exec()
    }

    private async criar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {

        const jogadorCriado = new this.jogadorModel(criarJogadorDto)

        return await jogadorCriado.save()
    }

    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        const { email } = criarJogadorDto

        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec()

        if(jogadorEncontrado)
            return await this.atualizar(criarJogadorDto)
        else
            return await this.criar(criarJogadorDto)
    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return await this.jogadorModel.find().exec();
    }

    async consultarJogadoresPeloEmail(email: string): Promise<Jogador> {
        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec()

        if(jogadorEncontrado) {
            return jogadorEncontrado
        } else {
            throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`)
        }
    }

    async deletarJogador(email: string): Promise<any> {
        return await this.jogadorModel.remove({email}).exec();
    }
}
