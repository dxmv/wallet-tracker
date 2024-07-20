package com.tracker.server.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// Crypto from coinmarketcap, just with the amount
// We aren't saving all coins in the database, instead the user on the frontend chooses the coin
// We can always get the amount in dollars by calling the coinmarketcap api
@Entity
@Table(name = "CRYPTO")
@Getter
@Setter
@NoArgsConstructor
public class Crypto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "ticker")
    private String ticker;

    @Column(name = "amount")
    private double amount;

    @Column(name="apiId")
    private String apiId;

    @Column(name="imageUrl")
    private String imageUrl;

    // Add this field to establish the relationship with Wallet
    @ManyToOne
    @JoinColumn(name = "WALLET_ID")
    @JsonBackReference
    private Wallet wallet;

    @Override
    public boolean equals(Object obj) {
        if(obj instanceof Crypto c){
            return this.name.equals(c.getName()) && this.ticker.equals(c.getTicker());
        }
        return false;
    }
}
