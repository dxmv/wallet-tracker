package com.tracker.server.models;

import jakarta.persistence.*;

@Entity
@Table(name = "crypto")
public class Crypto {

    @Id
    private Long id;

    private String name;
    private String ticker;
    private double amount;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTicker() {
        return ticker;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public Long getId() {
        return id;
    }

}
