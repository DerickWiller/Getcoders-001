import { Repository } from 'typeorm';
import { Pessoa } from './pessoa.entity';
export declare class PessoaService {
    private pessoaRepository;
    constructor(pessoaRepository: Repository<Pessoa>);
    create(pessoa: Pessoa): Promise<Pessoa>;
    findAll(): Promise<Pessoa[]>;
    findOne(cpf: string): Promise<Pessoa | null>;
    update(cpf: string, pessoa: Partial<Pessoa>): Promise<Pessoa | null>;
    remove(cpf: string): Promise<void>;
}
