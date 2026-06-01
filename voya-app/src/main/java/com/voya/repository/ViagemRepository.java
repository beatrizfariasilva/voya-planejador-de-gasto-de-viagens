package com.voya.repository;

import com.voya.model.Viagem;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ViagemRepository extends JpaRepository<Viagem, UUID> {
    List<Viagem> findByUsuarioId(UUID usuarioId);
}
