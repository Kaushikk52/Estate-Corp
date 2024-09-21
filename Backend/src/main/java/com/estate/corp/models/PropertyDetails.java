package com.estate.corp.models;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Embeddable
public class PropertyDetails {
    private int bedrooms;
    private int bathrooms;
    private int balconies;
    private int floorNo;
    private String boundaryWall;
    private List<String> ammenities;
    private String facing;
    private String carpetArea;
    private String areaUnit;
    private boolean isApproved;
    private Date availability;
    private double rent;
    @Column(name = "price", insertable = false, updatable = false)
    private double price;
    @Enumerated(EnumType.STRING)
    private PropertyDetails.FurnishedStatus furnishedStatus;

    public enum FurnishedStatus{
        FURNISHED , UNFURNISHED, SEMIFURNISHED
    }

}
