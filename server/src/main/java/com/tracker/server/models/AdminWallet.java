package com.tracker.server.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

}