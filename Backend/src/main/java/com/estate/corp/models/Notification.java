package com.estate.corp.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Notification {

    @Id
    private String id;

    @Column(nullable = false)
    private String userId;

    private String propertyId;
    private String propertyName;

    private String projectId;
    private String projectName;

    private String ownerId;
    private String ownerName;

    @Embedded
    private Enquiry enquiry;

    @Enumerated(EnumType.STRING)
    private Subject subject;

    private Date sentDate;

    @PrePersist
    private void prePersist(){
        if(this.id == null) {
            this.id = UUID.randomUUID().toString();
        }
    }

    public enum Subject{
        PROJECT_ENQUIRY,PROPERTY_ENQUIRY,CASUAL_ENQUIRY,
        HOME_LOAN,PACKING_MOVING,INTERIOR_DESIGN,LEGAL_ASSIST,
        ACQUISITION,REDEVELOPMENT,JV,FUNDING,
        OTHER
    }
}