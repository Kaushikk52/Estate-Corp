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
public class Payment {

    @Id
    private String id;
    @ManyToOne
    private Booking booking;
    private Double amount;
    private LocalDate paymentDate;
    @Enumerated(EnumType.STRING)
    private PaymentStatus status;

    public enum PaymentStatus {
        PENDING, COMPLETED, FAILED, REFUNDED
    }

    @PrePersist
    private void prePersist(){
        if(this.id == null){
            this.id = UUID.randomUUID().toString();
        }
    }

}
