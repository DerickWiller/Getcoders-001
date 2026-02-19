package br.com.getcoders.pessoa.service;

import br.com.getcoders.pessoa.bo.PessoaBO;
import br.com.getcoders.pessoa.dao.PessoaRepository;
import br.com.getcoders.pessoa.dto.PessoaDTO;
import br.com.getcoders.pessoa.model.Pessoa;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PessoaService {

    private final PessoaRepository pessoaRepository;
    private final PessoaBO pessoaBO;

    public PessoaDTO salvar(PessoaDTO pessoaDTO) {
        Pessoa pessoa = pessoaBO.converterParaEntidade(pessoaDTO);
        Pessoa pessoaSalva = pessoaRepository.save(pessoa);
        return pessoaBO.converterParaDTO(pessoaSalva);
    }

    public List<PessoaDTO> listar() {
        List<Pessoa> pessoas = pessoaRepository.findAll();
        return pessoaBO.converterListaParaDTO(pessoas);
    }

    public Optional<PessoaDTO> buscarPorCpf(String cpf) {
        Optional<Pessoa> pessoa = pessoaRepository.findById(cpf);
        return pessoa.map(pessoaBO::converterParaDTO);
    }

    public PessoaDTO atualizar(String cpf, PessoaDTO pessoaDTO) {
        Optional<Pessoa> pessoaExistente = pessoaRepository.findById(cpf);
        
        if (pessoaExistente.isPresent()) {
            Pessoa pessoa = pessoaExistente.get();
            pessoa.setNome(pessoaDTO.getNome());
            pessoa.setEndereco(pessoaDTO.getEndereco());
            pessoa.setTelefone(pessoaDTO.getTelefone());
            pessoa.setDataNascimento(pessoaDTO.getDataNascimento());
            pessoa.setEscolaridade(pessoaDTO.getEscolaridade());
            
            Pessoa pessoaAtualizada = pessoaRepository.save(pessoa);
            return pessoaBO.converterParaDTO(pessoaAtualizada);
        }
        
        return null;
    }

    public boolean deletar(String cpf) {
        if (pessoaRepository.existsById(cpf)) {
            pessoaRepository.deleteById(cpf);
            return true;
        }
        return false;
    }
}

