import { PessoaService } from './pessoa.service';
import { Pessoa } from './pessoa.entity';
export declare class PessoaController {
    private readonly service;
    constructor(service: PessoaService);
    create(pessoa: Pessoa): Promise<Pessoa>;
    findAll(): Promise<Pessoa[]>;
    findOne(cpf: string): Promise<Pessoa | null>;
    update(cpf: string, pessoa: Partial<Pessoa>): Promise<Pessoa | null>;
    remove(cpf: string): Promise<void>;
}
