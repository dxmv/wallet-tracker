package com.tracker.server.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.fasterxml.jackson.annotation.JsonBackReference;

import java.util.ArrayList;
import java.util.List;


@Entity
@Table (name="WALLETS")
@Getter
@Setter
@NoArgsConstructor
public class Wallet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    @ManyToOne
    @JoinColumn(name = "USER_ID", nullable = false)
    @JsonBackReference
    private User user;

    @OneToMany(mappedBy = "wallet") // Specify mappedBy here
    private List<Crypto> coins = new ArrayList<>();

}
