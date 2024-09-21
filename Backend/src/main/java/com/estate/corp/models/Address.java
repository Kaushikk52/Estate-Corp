package com.estate.corp.models;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Id;
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
