import { Routes } from '@angular/router';
import { PessoasListComponent } from './list/list.component';
import { PessoasFormComponent } from './form/form.component';

export default [
    {
        path: '',
        component: PessoasListComponent,
    },
    {
        path: 'novo',
        component: PessoasFormComponent,
    },
    {
        path: 'editar/:cpf',
        component: PessoasFormComponent,
    }
] as Routes;

