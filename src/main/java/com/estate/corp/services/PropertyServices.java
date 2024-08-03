package com.estate.corp.services;

import com.estate.corp.models.Property;
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



}
