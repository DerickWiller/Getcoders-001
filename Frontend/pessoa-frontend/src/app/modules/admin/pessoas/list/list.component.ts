import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PessoaService } from '../pessoa.service';
import { Pessoa } from '../pessoa.model';

@Component({
    selector: 'pessoas-list',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatInputModule,
        MatFormFieldModule,
        MatDialogModule
    ],
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class PessoasListComponent implements OnInit {
    displayedColumns: string[] = ['cpf', 'nome', 'telefone', 'endereco', 'dataNascimento', 'escolaridade', 'actions'];
    dataSource: MatTableDataSource<Pessoa>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private pessoaService: PessoaService,
        private router: Router,
        private dialog: MatDialog
    ) {
        this.dataSource = new MatTableDataSource<Pessoa>([]);
    }

    ngOnInit(): void {
        this.carregarPessoas();
    }

    carregarPessoas(): void {
        this.pessoaService.listar().subscribe({
            next: (pessoas) => {
                this.dataSource.data = pessoas;
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            error: (error) => {
                console.error('Erro ao carregar pessoas:', error);
            }
        });
    }

    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    novaPessoa(): void {
        this.router.navigate(['/pessoas/novo']);
    }

    editarPessoa(pessoa: Pessoa): void {
        this.router.navigate(['/pessoas/editar', pessoa.cpf]);
    }

    deletarPessoa(pessoa: Pessoa): void {
        if (confirm(`Deseja realmente excluir ${pessoa.nome}?`)) {
            this.pessoaService.deletar(pessoa.cpf).subscribe({
                next: () => {
                    this.carregarPessoas();
                },
                error: (error) => {
                    console.error('Erro ao deletar pessoa:', error);
                }
            });
        }
    }

    formatarData(data: string): string {
        if (!data) return '';
        const d = new Date(data);
        return d.toLocaleDateString('pt-BR');
    }
}

