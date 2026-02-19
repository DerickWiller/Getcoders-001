import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoaService } from '../pessoa.service';
import { Pessoa } from '../pessoa.model';

@Component({
    selector: 'pessoas-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class PessoasFormComponent implements OnInit {
    pessoaForm: FormGroup;
    isEditMode: boolean = false;
    cpfOriginal: string;

    escolaridades: string[] = [
        'Ensino Fundamental Incompleto',
        'Ensino Fundamental Completo',
        'Ensino Médio Incompleto',
        'Ensino Médio Completo',
        'Ensino Superior Incompleto',
        'Ensino Superior Completo',
        'Pós-graduação',
        'Mestrado',
        'Doutorado'
    ];

    constructor(
        private fb: FormBuilder,
        private pessoaService: PessoaService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.pessoaForm = this.fb.group({
            cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
            nome: ['', [Validators.required, Validators.minLength(3)]],
            endereco: ['', Validators.required],
            telefone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
            dataNascimento: ['', Validators.required],
            escolaridade: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        const cpf = this.route.snapshot.paramMap.get('cpf');
        if (cpf) {
            this.isEditMode = true;
            this.cpfOriginal = cpf;
            this.carregarPessoa(cpf);
            this.pessoaForm.get('cpf').disable();
        }
    }

    carregarPessoa(cpf: string): void {
        this.pessoaService.buscarPorCpf(cpf).subscribe({
            next: (pessoa) => {
                this.pessoaForm.patchValue({
                    cpf: pessoa.cpf,
                    nome: pessoa.nome,
                    endereco: pessoa.endereco,
                    telefone: pessoa.telefone,
                    dataNascimento: new Date(pessoa.dataNascimento),
                    escolaridade: pessoa.escolaridade
                });
            },
            error: (error) => {
                console.error('Erro ao carregar pessoa:', error);
                this.router.navigate(['/pessoas']);
            }
        });
    }

    salvar(): void {
        if (this.pessoaForm.valid) {
            const formValue = this.pessoaForm.getRawValue();

            const pessoa: Pessoa = {
                ...formValue,
                dataNascimento: this.formatarDataParaBackend(formValue.dataNascimento)
            };

            if (this.isEditMode) {
                this.pessoaService.atualizar(this.cpfOriginal, pessoa).subscribe({
                    next: () => {
                        this.router.navigate(['/pessoas']);
                    },
                    error: (error) => {
                        console.error('Erro ao atualizar pessoa:', error);
                    }
                });
            } else {
                this.pessoaService.salvar(pessoa).subscribe({
                    next: () => {
                        this.router.navigate(['/pessoas']);
                    },
                    error: (error) => {
                        console.error('Erro ao salvar pessoa:', error);
                    }
                });
            }
        }
    }

    cancelar(): void {
        this.router.navigate(['/pessoas']);
    }

    formatarDataParaBackend(data: Date): string {
        if (!data) return '';
        const d = new Date(data);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    formatarCPF(event: any): void {
        let value = event.target.value.replace(/\D/g, '');
        if (value.length > 11) {
            value = value.substr(0, 11);
        }
        this.pessoaForm.get('cpf').setValue(value, { emitEvent: false });
    }

    formatarTelefone(event: any): void {
        let value = event.target.value.replace(/\D/g, '');
        if (value.length > 11) {
            value = value.substr(0, 11);
        }
        this.pessoaForm.get('telefone').setValue(value, { emitEvent: false });
    }
}

