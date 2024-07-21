package com.estate.corp.models;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Id;

@Embeddable
public class Address {
    @Id
    private String id;
    private String street;
    private String city;
    private String locality;
    private String zipCode;


}
