package com.estate.corp.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

    private String city;
    //    private String boundaryWall;
    private List<String> ammenities;
    private String facing;

    private String carpetArea;

    private String areaUnit;

    @Column(name = "is_approved")
    private Boolean isApproved;

    @Future
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private Date availability;

    private double rent;

    @Column(name = "price")
    private double price;

    private String amtUnit;

    @Enumerated(EnumType.STRING)
    private PropertyDetails.IsNegotiable isNegotiable;

    @Enumerated(EnumType.STRING)
    private PropertyDetails.FurnishedStatus furnishedStatus;

    public enum FurnishedStatus {
        FURNISHED, UNFURNISHED, SEMIFURNISHED
    }

    public enum IsNegotiable {
        YES,NO
    }

}
