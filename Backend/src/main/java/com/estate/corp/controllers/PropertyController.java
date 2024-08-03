package com.estate.corp.controllers;

import com.estate.corp.models.Property;
import com.estate.corp.services.PropertyServices;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/v1/api/properties")
public class PropertyController {

    @Autowired
    private PropertyServices propertyServ;

    @GetMapping
    public List<Property> getAllProperties() {
        return propertyServ.getAllProperties();
    }

    @PostMapping
    public Property saveProperty(@RequestBody Property property) {
        return propertyServ.saveProperty(property);
    }

}
