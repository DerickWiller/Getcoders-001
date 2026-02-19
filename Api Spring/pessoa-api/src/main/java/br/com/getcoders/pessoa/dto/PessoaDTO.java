package br.com.getcoders.pessoa.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PessoaDTO {

    private String cpf;
    private String nome;
    private String endereco;
    private String telefone;
    private LocalDate dataNascimento;
    private String escolaridade;
}

