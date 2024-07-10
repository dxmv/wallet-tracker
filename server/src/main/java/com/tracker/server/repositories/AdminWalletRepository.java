package com.tracker.server.repositories;

import com.tracker.server.models.AdminWallet;
import com.tracker.server.models.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdminWalletRepository extends JpaRepository<AdminWallet,Long> {
    Optional<AdminWallet> findByName(String name);
}
