package com.estate.corp.controllers;

import com.estate.corp.models.Property;
import com.estate.corp.services.PropertyServices;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping(value = "/v1/api/properties")
public class PropertyController {

    @Autowired
    private PropertyServices propertyServ;

    @GetMapping(value = "/all")
    public ResponseEntity<?> getAllProperties() {
        List<Property> properties = propertyServ.getAllProperties();
        Map<String, Object> response = new HashMap<>();
        response.put("message", "All properties retrieved");
        response.put("properties",properties);
        if (properties.isEmpty()) {
            log.warn("Property Repository is Empty");
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(properties);
        }
        log.info("Retrieved all properties :{}",properties.size());
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/filter")
    public ResponseEntity<?>  filterProperties(
            @RequestParam(required = false) List<Integer> bedrooms,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String amtUnit,
            @RequestParam(required = false) List<String> cities,
            @RequestParam(required = false) Double minCarpetArea,
            @RequestParam(required = false) Double maxCarpetArea,
            @RequestParam(required =false) String areaUnit) {

        try{
            Map<String,Object> filters = new HashMap<>();
            // Add only non-null filters
            if (bedrooms != null) filters.put("bedrooms", bedrooms);
            if (minPrice != null){
                filters.put("minPrice", minPrice);
                filters.put("amtUnit",amtUnit);
            }else{
                filters.remove("amtUnit");
            }
            if (maxPrice != null) filters.put("maxPrice", maxPrice);
            if (cities != null && !cities.isEmpty()) filters.put("cities", cities);
            if (minCarpetArea != null) {
                filters.put("minCarpetArea", minCarpetArea);
                filters.put("areaUnit",areaUnit);
            }else{
                filters.remove("areaUnit");
            }
            if (maxCarpetArea != null) filters.put("maxCarpetArea", maxCarpetArea);

            List<Property> filteredProperties = propertyServ.getFilteredProperties(filters);
            Map<String, Object> response = new HashMap<>();

            // Check for empty results
            if (filteredProperties.isEmpty() && (cities != null && !cities.isEmpty()) && (bedrooms != null && !bedrooms.isEmpty())) {
                String city = cities.get(0);
                int bedroom = bedrooms.get(0);
                filteredProperties = propertyServ.getApprovedPropertiesByCityAndBedrooms(true, city, bedroom);
                log.warn("Retrieved properties by city and bedrooms");
                response.put("message", "All properties retrieved by city and bedrooms");
            } else {
                response.put("message", "All properties retrieved");
            }

            response.put("properties", filteredProperties);

            if (filteredProperties.isEmpty()) {
                response.put("message", "No properties found");
                log.warn("No properties found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            } else {
                log.info("Retrieved all properties");
                return ResponseEntity.ok(response);
            }
        } catch (Exception e) {
            log.error("An error occurred: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while processing the request.");
        }
    }

    @GetMapping(value = "/find")
    public ResponseEntity<?> getPropertiesByCityAndBedrooms(@RequestParam String city, @RequestParam int bedrooms) {
        try {
            List<Property> properties = propertyServ.getPropertiesByCityAndBedrooms(city,bedrooms);
            if (properties.isEmpty()) {
                log.warn("Properties in {} does not exists", city);
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(properties);
            }
            log.info("Retrieved all properties by city :{}", properties);
            return ResponseEntity.status(HttpStatus.OK).body(properties);
        } catch (IllegalArgumentException e) {
            log.warn("An Error occurred : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());

        }
    }

    @GetMapping(value = "/isApproved")
    public ResponseEntity<?> getPropertiesByApprovalStatus(@RequestParam boolean isApproved) {
        try {
            Map<String, Object> response = new HashMap<>();
            if (!isApproved) {
                List<Property> unApprovedProperties = propertyServ.getPropertiesByApprovalStatus(isApproved);
                if(unApprovedProperties.size() == 0){

                    response.put("message","Not found any unaproved properties");
                    response.put("properties",unApprovedProperties);
                    log.info("Not found any unapproved properties");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
                }else{
                    response.put("message","Retrieved all unapproved Properties");
                    response.put("properties",unApprovedProperties);
                    log.info("Retrieved all unapproved properties :{}", unApprovedProperties);
                    return ResponseEntity.status(HttpStatus.OK).body(response);
                }

            } else {
                List<Property> approvedProperties = propertyServ.getPropertiesByApprovalStatus(isApproved);
                if(approvedProperties.size() ==0){
                    response.put("message","Not found any approved properties");
                    response.put("properties",approvedProperties);
                    log.info("Not found any approved properties");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
                }else{
                    response.put("message","Retrieved all approved Properties");
                    response.put("properties",approvedProperties);
                    log.info("Retrieved all approved properties :{}", approvedProperties);
                    return ResponseEntity.status(HttpStatus.OK).body(response);
                }

            }
        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping(value = "/id/{id}")
    public ResponseEntity<?> getPropertyById(@PathVariable String id){
        try{
            Property property = propertyServ.getPropertyById(id);
            log.info("Retrieved property with ID :{}", id);
            return ResponseEntity.status(HttpStatus.OK).body(property);
        }catch(Exception e){
            log.error("An Error occurred : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @GetMapping(value = "/name/{name}")
    public ResponseEntity<?> getPropertyByName(@PathVariable String name){
        try{
            Property property = propertyServ.getPropertyByName(name);
            log.info("Retrieved property with Name :{}", name);
            return ResponseEntity.status(HttpStatus.OK).body(property);
        }catch(Exception e){
            log.error("An Error occurred : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PostMapping(value = "/post")
    public ResponseEntity<Property> saveProperty(@RequestBody Property property, Principal principal) {
        try {
            Property savedProperty = propertyServ.saveProperty(property,principal);
            log.info("Property posted successfully : {}", savedProperty.getId());
            return ResponseEntity.status(HttpStatus.CREATED).body(savedProperty);
        } catch (IllegalArgumentException e) {
            log.warn("An Error occurred : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        } catch (IOException e) {
            log.warn("An Error occurred : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping(value = "/approvalStatus/{id}")
    public ResponseEntity<?> changeApprovalStatus(@PathVariable String id) {
        try {
            propertyServ.changeApprovalStatus(id);
            log.info("Property approval status changed successfully : {}", id);
            return ResponseEntity.status(HttpStatus.OK).body("Property approval status changed successfully ");
        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

}
