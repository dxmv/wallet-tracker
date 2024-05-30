package com.tracker.server.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "crypto")
@Getter
@Setter
@NoArgsConstructor
public class Crypto {

    @Id
    private Long id;

    private String name;
    private String ticker;
    private double amount;
}
