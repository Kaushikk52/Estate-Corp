package com.estate.corp.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import lombok.*;

import java.util.UUID;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class FloorPlan {
    @Id
    private String id;
    private String name;
    private String image;
    private int bedrooms;
    private int bathrooms;
    private int balconies;
    private double rent;
    @Column(name = "price")
    private double price;
    private String amtUnit;
    private Double carpetArea;
    private String areaUnit;
    @Column(name = "description")
    private String description;

    @PrePersist
    private void prePersist(){
        if(this.id == null){
            this.id = UUID.randomUUID().toString();
        }
    }

}
