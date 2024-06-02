package com.tracker.server.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// Crypto from coinmarketcap, just with the amount
// We aren't saving all coins in the database, instead the user on the frontend chooses the coin
// We can always get the amount in dollars by calling the coinmarketcap api
@Entity
@Table(name = "crypto")
@Getter
@Setter
@NoArgsConstructor
public class Crypto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name",unique = true)
    private String name;

    @Column(name = "ticker",unique = true)
    private String ticker;

    @Column(name = "amount",unique = true)
    private double amount;
}
