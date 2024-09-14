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
    private String propertyOwner;
    private String propertyName;
    private String projectName;
    private Double price;
    private Date createdAt;
    private Date updatedAt;
    @Lob
    private byte[] image;
    @Embedded
    private Address address;
    @Embedded
    private PropertyDetails details;
    @Enumerated(EnumType.STRING)
    private Property.PropertyVariant propertyVariant;
    private String propertyType;

    @PrePersist
    private void prePersist(){
        if(this.id == null){
            this.id = UUID.randomUUID().toString();
        }
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
