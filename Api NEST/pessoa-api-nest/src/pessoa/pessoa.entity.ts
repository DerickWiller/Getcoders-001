import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Pessoa {

    @PrimaryColumn()
    cpf: string;

    @Column()
    nome: string;

    @Column()
    endereco: string;

    @Column()
    telefone: string;

    @Column({ type: 'date' })
    dataNascimento: string;

    @Column()
    escolaridade: string;
}

