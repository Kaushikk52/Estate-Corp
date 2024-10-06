package com.estate.corp.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Booking {

    @Id
    private String id;
    @ManyToOne
    private User user;
    @ManyToOne
    private Property property;
    private LocalDate startDate;
    private LocalDate endDate;
    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    public enum BookingStatus{
        PENDING, CONFIRMED, CANCELED
    }

    @PrePersist
    private void prePersist(){
        if(this.id == null) {
            this.id = UUID.randomUUID().toString();
        }
    }
}

