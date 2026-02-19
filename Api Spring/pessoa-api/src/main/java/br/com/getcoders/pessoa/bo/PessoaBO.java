package br.com.getcoders.pessoa.bo;

import br.com.getcoders.pessoa.dao.PessoaRepository;
import br.com.getcoders.pessoa.dto.PessoaDTO;
import br.com.getcoders.pessoa.model.Pessoa;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class PessoaBO {

    private final PessoaRepository pessoaRepository;

    public PessoaDTO converterParaDTO(Pessoa pessoa) {
        if (pessoa == null) {
            return null;
        }
        return new PessoaDTO(
                pessoa.getCpf(),
                pessoa.getNome(),
                pessoa.getEndereco(),
                pessoa.getTelefone(),
                pessoa.getDataNascimento(),
                pessoa.getEscolaridade()
        );
    }

    public Pessoa converterParaEntidade(PessoaDTO pessoaDTO) {
        if (pessoaDTO == null) {
            return null;
        }
        return new Pessoa(
                pessoaDTO.getCpf(),
                pessoaDTO.getNome(),
                pessoaDTO.getEndereco(),
                pessoaDTO.getTelefone(),
                pessoaDTO.getDataNascimento(),
                pessoaDTO.getEscolaridade()
        );
    }

    public List<PessoaDTO> converterListaParaDTO(List<Pessoa> pessoas) {
        return pessoas.stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }
}

