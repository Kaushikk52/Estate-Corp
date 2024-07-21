package com.estate.corp.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Entity
@Data
public class Property {
    @Id
    private String id;
    private String name;
    private String location;
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
    private Property.PropertyType propertyType;


    @PrePersist
    private void prePersist(){
        if(this.id == null){
            this.id = UUID.randomUUID().toString();
        }
    }

    public enum PropertyType{
        RESIDENTIAL(SubCategory.RESIDENTIAL_SUBCATEGORY),
        COMMERCIAL(SubCategory.COMMERCIAL_SUBCATEGORY);

        private SubCategory subCategory;

        PropertyType(SubCategory subCategory) {
            this.subCategory = subCategory;
        }

        public SubCategory getSubCategory() {
            return subCategory;
        }

        public enum SubCategory {
            RESIDENTIAL_SUBCATEGORY("Apartment", "Villa", "Townhouse"),
            COMMERCIAL_SUBCATEGORY("Office", "Retail", "Warehouse");

            private String[] subTypes;

            SubCategory(String... subTypes) {
                this.subTypes = subTypes;
            }

            public String[] getSubTypes() {
                return subTypes;
            }
        }
    }
}
