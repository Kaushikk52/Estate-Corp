package com.estate.corp.models;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Embeddable
@Data
public class PropertyDetails {
    @Id
    private String id;
    private int bedrooms;
    private int totalFloor;
    private int floorNo;
    private String boundaryWall;
    private List<String> ammenities;
    private String facing;
    private String carpetArea;
    private String coveredArea;
    private String superArea;
    private String plotArea;
    private String areaUnit;
    private double rent;
    @Column(name = "price", insertable = false, updatable = false)
    private double price;
    private boolean isApproved;
    private Date availability;


    @Enumerated(EnumType.STRING)
    private PropertyDetails.FurnishedStatus furnishedStatus;

    public enum FurnishedStatus{
        FURNISHED , UNFURNISHED
    }

}
