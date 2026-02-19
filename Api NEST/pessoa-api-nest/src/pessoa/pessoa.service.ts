import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pessoa } from './pessoa.entity';

@Injectable()
export class PessoaService {
    constructor(
        @InjectRepository(Pessoa)
        private pessoaRepository: Repository<Pessoa>,
    ) {}

    create(pessoa: Pessoa): Promise<Pessoa> {
        return this.pessoaRepository.save(pessoa);
    }

    findAll(): Promise<Pessoa[]> {
        return this.pessoaRepository.find();
    }

    findOne(cpf: string): Promise<Pessoa | null> {
        return this.pessoaRepository.findOne({ where: { cpf } });
    }

    async update(cpf: string, pessoa: Partial<Pessoa>): Promise<Pessoa | null> {
        await this.pessoaRepository.update(cpf, pessoa);
        return this.findOne(cpf);
    }

    async remove(cpf: string): Promise<void> {
        await this.pessoaRepository.delete(cpf);
    }
}

