package com.estate.corp.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Embeddable
public class PropertyDetails {
    private int bedrooms;

    private int bathrooms;

    private int balconies;

    private int floorNo;

    private String location;

    @Column(name = "amenities", length = 500)
    private List<String> ammenities;

    private String facing;

    private Double carpetArea;

    private String areaUnit;

    @Column(name = "is_approved")
    private Boolean isApproved;

    private String underConstruction;

    @Future
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private String builtIn;

    @Future
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private String possesion;

    private double rent;

    @Column(name = "price")
    private double price;

    private String amtUnit;

    @Lob
    @Column(name = "description",columnDefinition = "TEXT")
    private String description;

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