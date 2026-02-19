import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pessoa } from './pessoa.model';

@Injectable({ providedIn: 'root' })
export class PessoaService {

    private api = 'http://localhost:8080/pessoas'; // Spring Boot
    //private api = 'http://localhost:3000/pessoas';   // NestJS

    constructor(private http: HttpClient) {}

    salvar(pessoa: Pessoa): Observable<Pessoa> {
        return this.http.post<Pessoa>(this.api, pessoa);
    }

    listar(): Observable<Pessoa[]> {
        return this.http.get<Pessoa[]>(this.api);
    }

    buscarPorCpf(cpf: string): Observable<Pessoa> {
        return this.http.get<Pessoa>(`${this.api}/${cpf}`);
    }

    atualizar(cpf: string, pessoa: Pessoa): Observable<Pessoa> {
        return this.http.put<Pessoa>(`${this.api}/${cpf}`, pessoa);
    }

    deletar(cpf: string): Observable<void> {
        return this.http.delete<void>(`${this.api}/${cpf}`);
    }
}

