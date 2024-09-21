package com.estate.corp.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;

import java.util.Date;
import java.util.UUID;

@Entity
@Data
public class Property {
    @Id
    private String id;
    private Date createdAt;
    private Date updatedAt;
    private String owner;
    private String name;
    @Lob
    private byte[] image;
    @Enumerated(EnumType.STRING)
    private PropertyType type;
    @Enumerated(EnumType.STRING)
    private Property.PropertyVariant propertyVariant;
    @Embedded
    private Address address;
    @Embedded
    private PropertyDetails details;
    @ManyToOne
    @JoinColumn(name = "projectId")
    private Project project;

    @PrePersist
    private void prePersist(){
        if(this.id == null){
            this.id = UUID.randomUUID().toString();
        }
    }

    public enum PropertyType{
        RENT,BUY
    }

    public enum PropertyVariant{
        RESIDENTIAL(SubVariant.RESIDENTIAL_SUBVARIANT),
        COMMERCIAL(SubVariant.COMMERCIAL_SUBVARIANT);

        private SubVariant subVariant;

        PropertyVariant(SubVariant subVariant) {
            this.subVariant = subVariant;
        }

        public SubVariant getSubVariant() {
            return subVariant;
        }

        public enum SubVariant {
            RESIDENTIAL_SUBVARIANT("Apartment", "Villa", "Townhouse"),
            COMMERCIAL_SUBVARIANT("Office", "Retail", "Warehouse");

            private String[] subVariants;

            SubVariant(String... subVariants) {
                this.subVariants = subVariants;
            }

        }
    }
}
