import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { Pessoa } from './pessoa.entity';

@Controller('pessoas')
export class PessoaController {
    constructor(private readonly service: PessoaService) {}

    @Post()
    create(@Body() pessoa: Pessoa) {
        return this.service.create(pessoa);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':cpf')
    findOne(@Param('cpf') cpf: string) {
        return this.service.findOne(cpf);
    }

    @Put(':cpf')
    update(@Param('cpf') cpf: string, @Body() pessoa: Partial<Pessoa>) {
        return this.service.update(cpf, pessoa);
    }

    @Delete(':cpf')
    remove(@Param('cpf') cpf: string) {
        return this.service.remove(cpf);
    }
}

