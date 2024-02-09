package com.tracker.server.repositories;

import com.tracker.server.models.Crypto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CryptoRepository extends JpaRepository<Crypto,Long> {
}
