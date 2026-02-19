package br.com.getcoders.pessoa.controller;

import br.com.getcoders.pessoa.dto.PessoaDTO;
import br.com.getcoders.pessoa.service.PessoaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/pessoas")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", maxAge = 3600)
public class PessoaController {

    private final PessoaService pessoaService;

    @PostMapping
    public ResponseEntity<PessoaDTO> salvar(@RequestBody PessoaDTO pessoaDTO) {
        PessoaDTO pessoaSalva = pessoaService.salvar(pessoaDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(pessoaSalva);
    }

    @GetMapping
    public ResponseEntity<List<PessoaDTO>> listar() {
        List<PessoaDTO> pessoas = pessoaService.listar();
        return ResponseEntity.ok(pessoas);
    }

    @GetMapping("/{cpf}")
    public ResponseEntity<PessoaDTO> buscarPorCpf(@PathVariable String cpf) {
        Optional<PessoaDTO> pessoa = pessoaService.buscarPorCpf(cpf);
        return pessoa.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{cpf}")
    public ResponseEntity<PessoaDTO> atualizar(@PathVariable String cpf, @RequestBody PessoaDTO pessoaDTO) {
        PessoaDTO pessoaAtualizada = pessoaService.atualizar(cpf, pessoaDTO);
        
        if (pessoaAtualizada != null) {
            return ResponseEntity.ok(pessoaAtualizada);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{cpf}")
    public ResponseEntity<Void> deletar(@PathVariable String cpf) {
        boolean deletada = pessoaService.deletar(cpf);
        
        if (deletada) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

