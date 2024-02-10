package com.tracker.server.repositories;

import com.tracker.server.models.User;
import com.tracker.server.models.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WalletRepository extends JpaRepository<Wallet,Long> {
    @Query("SELECT w FROM Wallet w WHERE w.user.id = :userId")
    List<Wallet> findWalletsForUser(Long userId); // returns all wallets for a given user
}
