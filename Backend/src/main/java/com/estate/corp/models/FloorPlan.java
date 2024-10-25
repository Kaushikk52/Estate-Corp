package com.estate.corp.models;

import jakarta.persistence.*;
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

    @Enumerated(EnumType.STRING)
    private PropertyType type;

    private double bedrooms;
    private int bathrooms;
    private int balconies;
    private double rent;
    @Column(name = "price")
    private double price;
    private String amtUnit;
    private Double carpetArea;
    private String areaUnit;

    @Lob
    @Column(name = "description",columnDefinition = "TEXT")
    private String description;

    @PrePersist
    private void prePersist(){
        if(this.id == null){
            this.id = UUID.randomUUID().toString();
        }
    }

    public enum PropertyType{
        RENT,BUY
    }

}