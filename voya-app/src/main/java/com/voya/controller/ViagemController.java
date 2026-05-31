package com.voya.controller;

import org.springframework.web.bind.annotation.RestController;

import com.voya.model.Viagem;
import com.voya.service.ViagemService;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@RequestMapping("/api/viagem")
public class ViagemController {

    @Autowired
    private ViagemService viagemService;
    
    @PostMapping("/viagem/adicionar")
    public Viagem criarViagem(@RequestBody Viagem viagem){
        return viagemService.salvarViagem(viagem);
    }

    @GetMapping("/viagem/listar")
    public Iterable<Viagem> listar() {
        return viagemService.listarViagens();
    }

    @GetMapping("/viagem/buscar/{id}")
    public ResponseEntity<Viagem> buscarPorId(@PathVariable UUID id) {
        return ResponseEntity.ok(viagemService.buscarPorId(id));
    }

    @PatchMapping("viagem/atualizar/{id}")
    public ResponseEntity<Viagem> atualizarViagem(@PathVariable UUID id, @RequestBody Viagem viagem) {
        return ResponseEntity.ok(viagemService.atualizarViagem(id, viagem));
    }

    @DeleteMapping("viagem/deletar/{id}")
    public ResponseEntity<Void> excluirViagem(@PathVariable UUID id) {
        viagemService.excluirViagem(id);
        return ResponseEntity.noContent().build();
    }





    
}
