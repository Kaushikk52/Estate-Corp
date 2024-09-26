package com.estate.corp.models;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
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
//    private String boundaryWall;
    private List<String> ammenities;
    private String facing;
    private String carpetArea;
    private String areaUnit;
    private boolean isApproved;

    @Future
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private Date availability;
    private double rent;
    @Column(name = "price")
    private double price;
    @Enumerated(EnumType.STRING)
    private PropertyDetails.FurnishedStatus furnishedStatus;

    public enum FurnishedStatus{
        FURNISHED , UNFURNISHED, SEMIFURNISHED
    }

}
