package com.voya.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClient;

import com.voya.dto.PrevisaoRequest;
import com.voya.dto.PrevisaoResponse;
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
@RequestMapping("/api/usuarios/{usuarioId}/viagens")
public class ViagemController {

    @Autowired
    private ViagemService viagemService;

    @PostMapping
    public Viagem criarViagem(@RequestBody Viagem viagem, @PathVariable UUID usuarioId){
        return viagemService.salvarViagem(viagem, usuarioId);
    }

    @GetMapping
    public Iterable<Viagem> listar(@PathVariable UUID usuarioId) {
        return viagemService.listarViagensdoUsuario(usuarioId);
    }

    @GetMapping("/{viagemId}")
    public ResponseEntity<Viagem> buscarPorId(@PathVariable UUID usuarioId, @PathVariable UUID viagemId) {
        return ResponseEntity.ok(viagemService.buscarPorId(viagemId));
    }

    @PatchMapping("/{viagemId}")
    public ResponseEntity<Viagem> atualizarViagem(@PathVariable UUID usuarioId, @PathVariable UUID viagemId, @RequestBody Viagem viagem) {
        return ResponseEntity.ok(viagemService.atualizarViagem(viagemId, viagem));
    }

    @DeleteMapping("/{viagemId}")
    public ResponseEntity<Void> excluirViagem(@PathVariable UUID usuarioId, @PathVariable UUID viagemId) {
        viagemService.excluirViagem(viagemId);
        return ResponseEntity.noContent().build();
    }

    private final RestClient restClient=RestClient.create("http://localhost:5000");
    @PostMapping("/{viagemId}/prever")
    public PrevisaoResponse obterPrevisao(@PathVariable UUID usuarioId, @PathVariable UUID viagemId, @RequestBody PrevisaoRequest dados) {
        Viagem viagem=viagemService.buscarPorId(viagemId);
        PrevisaoResponse resposta= restClient.post().uri("/prever").body(dados).retrieve().body(PrevisaoResponse.class);
        viagem.setCustoEstimado(resposta.previsao());
        viagemService.salvarViagem(viagem, usuarioId);
        return resposta;
    }




    
}
