"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PessoaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pessoa_entity_1 = require("./pessoa.entity");
let PessoaService = class PessoaService {
    pessoaRepository;
    constructor(pessoaRepository) {
        this.pessoaRepository = pessoaRepository;
    }
    create(pessoa) {
        return this.pessoaRepository.save(pessoa);
    }
    findAll() {
        return this.pessoaRepository.find();
    }
    findOne(cpf) {
        return this.pessoaRepository.findOne({ where: { cpf } });
    }
    async update(cpf, pessoa) {
        await this.pessoaRepository.update(cpf, pessoa);
        return this.findOne(cpf);
    }
    async remove(cpf) {
        await this.pessoaRepository.delete(cpf);
    }
};
exports.PessoaService = PessoaService;
exports.PessoaService = PessoaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pessoa_entity_1.Pessoa)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PessoaService);
//# sourceMappingURL=pessoa.service.js.map