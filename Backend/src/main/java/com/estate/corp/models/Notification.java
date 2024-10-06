package com.estate.corp.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
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
