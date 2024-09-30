package com.estate.corp.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
public class Notification {

    @Id
    private String id;
    @ManyToOne
    private User user;
    private String message;
    private LocalDateTime sentDate;

    @PrePersist
    private void prePersist(){
        if(this.id == null) {
            this.id = UUID.randomUUID().toString();
        }
    }
}
