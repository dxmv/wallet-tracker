package com.tracker.server.repositories;

import com.tracker.server.models.Crypto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CryptoRepository extends JpaRepository<Crypto,Long> {
    @Query("SELECT c FROM Crypto c WHERE c.name = :name")
    List<Crypto> findAllByName(String name);
}
