package com.estate.corp.services;

import com.estate.corp.models.Property;
import com.estate.corp.models.PropertyDetails;
import com.estate.corp.repositories.PropertyRepo;
import com.estate.corp.specifications.PropertySpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PropertyServices {

    @Autowired
    private PropertyRepo propertyRepo;

    public Property saveProperty(Property property) {
        return propertyRepo.save(property);
    }

    public List<Property> getAllProperties() {
        return propertyRepo.findAll();
    }

    public Property getPropertyById(String id){
        return propertyRepo.findById(id).orElseThrow(()-> new RuntimeException("Property not found..."));
    }

    public Property getPropertyByName(String name){
        return propertyRepo.findByName(name);
    }

    public List<Property> getPropertiesByCityAndBedrooms(String city,int bedrooms){
        return propertyRepo.findByAddressCityAndDetailsBedrooms(city,bedrooms);
    }

    public List<Property> getPropertiesByApprovalStatus(boolean isApproved){
        return propertyRepo.findByDetailsIsApproved(isApproved);
    }

    public List<Property> getFilteredProperties(
            Integer bedrooms,
            Double minPrice,
            Double maxPrice,
            List<String> cities,
            Double minCarpetArea,
            Double maxCarpetArea) {

        Specification<Property> spec = PropertySpecification.filterByCriteria(
                bedrooms, minPrice, maxPrice, cities, minCarpetArea, maxCarpetArea);

        return propertyRepo.findAll(spec);
    }

    public Property changeApprovalStatus(String id){
        Property property = propertyRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Property with ID: " + id + " not found"));
        PropertyDetails details = property.getDetails();
        details.setApproved(!details.isApproved());
        return propertyRepo.save(property);
    }

    public void removeProperty(String name){
        Property property = propertyRepo.findByName(name);
        propertyRepo.delete(property);
    }



}
