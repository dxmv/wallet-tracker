package com.tracker.server.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 *  Only admins can create these wallets
 **/
@Entity
@Table (name="ADMIN_WALLETS")
@Getter
@Setter
@NoArgsConstructor
public class AdminWallet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;

    @Column(unique = true)
    private String iconUrl;

    @JsonBackReference
    @OneToMany(mappedBy = "adminWallet", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Wallet> wallets;

}