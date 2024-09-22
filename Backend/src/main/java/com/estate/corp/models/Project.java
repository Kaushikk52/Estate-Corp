package com.estate.corp.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Data
public class Project {
    @Id
    @Column(length = 36, nullable = false, unique = true) // UUID or unique ID with length constraint
    private String id;

    @NotNull(message = "Project name cannot be null")
    @Size(min = 3, max = 100, message = "Project name must be between 3 and 100 characters")
    @Column(nullable = false, length = 100)
    private String name;

    @NotNull(message = "Owner name cannot be null")
    @Size(min = 3, max = 100, message = "Owner name must be between 3 and 100 characters")
    @Column(nullable = false, length = 100)
    private String ownerName;

    @Embedded
    @NotNull(message = "Address cannot be null")
    private Address address;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<Property> properties;

    @Lob
    @Column(columnDefinition = "BLOB") // Specifies that this is a large binary object
    private byte[] images;

    @Min(value = 1, message = "Total floors must be at least 1")
    @Max(value = 200, message = "Total floors cannot exceed 200")
    @Column(nullable = false)
    private int totalFloors;

    @PastOrPresent(message = "Creation date must be in the past or present")
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date createdAt;

    @PastOrPresent(message = "Update date must be in the past or present")
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date updatedAt;


    @PrePersist
    private void prePersist(){
        if(this.id == null){
            this.id = UUID.randomUUID().toString();
        }
    }

}
