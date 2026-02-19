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
exports.PessoaController = void 0;
const common_1 = require("@nestjs/common");
const pessoa_service_1 = require("./pessoa.service");
const pessoa_entity_1 = require("./pessoa.entity");
let PessoaController = class PessoaController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(pessoa) {
        return this.service.create(pessoa);
    }
    findAll() {
        return this.service.findAll();
    }
    findOne(cpf) {
        return this.service.findOne(cpf);
    }
    update(cpf, pessoa) {
        return this.service.update(cpf, pessoa);
    }
    remove(cpf) {
        return this.service.remove(cpf);
    }
};
exports.PessoaController = PessoaController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pessoa_entity_1.Pessoa]),
    __metadata("design:returntype", void 0)
], PessoaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PessoaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':cpf'),
    __param(0, (0, common_1.Param)('cpf')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PessoaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':cpf'),
    __param(0, (0, common_1.Param)('cpf')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PessoaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':cpf'),
    __param(0, (0, common_1.Param)('cpf')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PessoaController.prototype, "remove", null);
exports.PessoaController = PessoaController = __decorate([
    (0, common_1.Controller)('pessoas'),
    __metadata("design:paramtypes", [pessoa_service_1.PessoaService])
], PessoaController);
//# sourceMappingURL=pessoa.controller.js.map