package com.estate.corp.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Blog {

    @Id
    @Column(name = "id", nullable = false, updatable = false, length = 36)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id",nullable = false)
    @JsonIgnoreProperties({"properties","projects","blogs"})
    private User author;
    private Date date;
    private String heading;
    private String subtitle;
    @Lob
    @Column(name = "content",columnDefinition = "TEXT")
    private String content;
    @Column(name = "images",length = 500)
    private String[] images;
    private Date createdAt;
    private Date updatedAt;


    @PrePersist
    private void prePersist(){
        if(this.id == null){
            this.id = UUID.randomUUID().toString();
        }
    }
}
