package com.estate.corp.models;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class Address {
    private String street;
    private String locality;
    private String landmark;
    private String city;
    private String zipCode;
}
