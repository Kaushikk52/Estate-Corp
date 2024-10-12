package com.estate.corp.models;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Lob;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Embeddable
public class Enquiry {
    private String name;
    private String phone;
    private String email;
    @Lob
    @Column(name = "content",columnDefinition = "TEXT")
    private String content;

}
