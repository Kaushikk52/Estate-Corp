package com.estate.corp.services;

import com.estate.corp.models.Property;
import com.estate.corp.models.PropertyDetails;
import com.estate.corp.repositories.PropertyRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropertyServices {

    @Autowired
    private PropertyRepo propertyRepo;


    public List<Property> getAllProperties() {
        return propertyRepo.findAll();
    }

    public Property saveProperty(Property property) {
        return propertyRepo.save(property);
    }

    public List<Property> getPropertiesByCityAndBedrooms(String city,int bedrooms){
        return propertyRepo.findByCityAndBedrooms(city,bedrooms);
    }

    public List<Property> getPropertiesByApprovalStatus(boolean isApproved){
        return propertyRepo.findByIsApproved(isApproved);
    }

    public Property changeApprovalStatus(String id){
        Property property = propertyRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Property with ID: " + id + " not found"));
        PropertyDetails details = property.getDetails();
        details.setApproved(!details.isApproved());
        return propertyRepo.save(property);
    }


}
