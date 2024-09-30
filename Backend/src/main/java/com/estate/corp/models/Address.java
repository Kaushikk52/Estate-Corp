package com.estate.corp.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Address {
    @Id
    private String id;
    private String street;
    private String locality;
    private String landmark;
//    private String city;
    private String zipCode;

//    @OneToMany(mappedBy = "address")
//    private List<Project> projects;
//
//    @OneToMany(mappedBy = "address")
//    private List<Property> properties;

    @PrePersist
    private void prePersist(){
        if(this.id == null){
            this.id = UUID.randomUUID().toString();
        }
    }
}
