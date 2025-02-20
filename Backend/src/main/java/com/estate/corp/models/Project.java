package com.estate.corp.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Project {
    @Id
    @Column(length = 36, nullable = false, unique = true)
    private String id;

    @NotNull(message = "Project name cannot be null")
    @Size(min = 3, max = 100, message = "Project name must be between 3 and 100 characters")
    @Column(nullable = false, length = 100)
    private String name;

    private String mahareraNo;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;

    @NotNull(message = "Owner cannot be null")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id",nullable = true)
    @JsonIgnoreProperties({"properties","projects"})
    private User owner;

    @OneToMany( cascade = CascadeType.ALL)
    @Column(nullable = true)
    private List<FloorPlan> floorPlans;

    @Column(name = "images", length = 5000, columnDefinition = "VARBINARY(5000)")
    private String[] images;

    private String location;

    private String builtIn;
    private String possesion;

    @Lob
    @Column(name = "description",columnDefinition = "TEXT")
    private String description;

    @Min(value = 1, message = "Total floors must be at least 1")
    @Max(value = 200, message = "Total floors cannot exceed 200")
    @Column(nullable = false)
    private int totalFloors;

    private String underConstruction;

    @Column(name = "ammenities", length = 2000)
    private List<String> ammenities;

    @PastOrPresent(message = "Creation date must be in the past or present")
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date createdAt;

    @PastOrPresent(message = "Update date must be in the past or present")
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = true)
    private Date updatedAt;


    @PrePersist
    private void prePersist(){
        if(this.id == null){
            this.id = UUID.randomUUID().toString();
        }
    }

}