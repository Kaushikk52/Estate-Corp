package com.estate.corp.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Address {
    @Id
    private String id;
    private String street;
    private String locality;
    private String landmark;
    private String city;
    private String zipCode;
}
