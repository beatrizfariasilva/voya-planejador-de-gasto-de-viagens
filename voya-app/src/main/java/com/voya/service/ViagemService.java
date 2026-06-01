package com.voya.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.voya.model.Usuario;
import com.voya.model.Viagem;
import com.voya.repository.UsuarioRepository;
import com.voya.repository.ViagemRepository;

@Service
public class ViagemService {
    
    @Autowired
    private ViagemRepository viagemRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    public Viagem salvarViagem(Viagem viagem, UUID usuarioId){
        Usuario usuario=usuarioRepository.findById(usuarioId).orElseThrow();
        viagem.setUsuario(usuario);
        
        return viagemRepository.save(viagem);
    }

    public List<Viagem> listarViagensdoUsuario(UUID usuarioId){
        return viagemRepository.findByUsuarioId(usuarioId);
    }

    public Viagem buscarPorId(UUID id){
        return viagemRepository.findById(id).orElse(null);
    }

    public void excluirViagem(UUID id) {
        viagemRepository.deleteById(id);
    }

    public Viagem atualizarViagem(UUID id, Viagem viagemAtualizada) {
        Viagem viagemAatualizar=viagemRepository.findById(id).orElseThrow(()->new RuntimeException("Viagem não encontrada"));
        viagemAatualizar.setDestino(viagemAtualizada.getDestino());
        viagemAatualizar.setDias(viagemAtualizada.getDias());
        viagemAatualizar.setPessoas(viagemAtualizada.getPessoas());
        viagemAatualizar.setHospedagem(viagemAtualizada.getHospedagem());
        viagemAatualizar.setPasseios(viagemAtualizada.getPasseios());
        viagemAatualizar.setVidaNoturna(viagemAtualizada.getVidaNoturna());
        viagemAatualizar.setAlimentacao(viagemAtualizada.getAlimentacao());

    return viagemRepository.save(viagemAatualizar);
}
    


}
