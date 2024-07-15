package com.tracker.server.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonBackReference;

import java.util.ArrayList;
import java.util.List;

/**
 *  Maps users with the wallets created by admins
 * */
@Entity
@Table(name = "WALLETS")
@Getter
@Setter
@NoArgsConstructor
public class Wallet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ADMIN_WALLET_ID", nullable = false)
    private AdminWallet adminWallet;

    @ManyToOne
    @JoinColumn(name = "USER_ID", nullable = false)
    @JsonBackReference
    private User user;

    @OneToMany(mappedBy = "wallet", cascade = CascadeType.ALL)
    private List<Crypto> coins = new ArrayList<>();
}

