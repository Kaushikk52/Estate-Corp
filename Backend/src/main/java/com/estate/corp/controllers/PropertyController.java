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
            @RequestParam(required = false) String variant,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) List<Integer> bedrooms,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String amtUnit,
            @RequestParam(required = false) List<String> locations,
            @RequestParam(required = false) Double minCarpetArea,
            @RequestParam(required = false) Double maxCarpetArea,
            @RequestParam(required =false) String areaUnit) {

        try{
            Map<String,Object> filters = new HashMap<>();
            // Add only non-null filters
            if(variant != null) filters.put("variant",variant);
            if(category != null) filters.put("type",category);
            if (bedrooms != null) filters.put("bedrooms", bedrooms);
            if (locations != null && !locations.isEmpty()) filters.put("locations", locations);
            if (minPrice != null){
                filters.put("minPrice", minPrice);
                filters.put("amtUnit",amtUnit);
            }else{
                filters.remove("amtUnit");
            }
            if (maxPrice != null) filters.put("maxPrice", maxPrice);

            if (minCarpetArea != null) {
                filters.put("minCarpetArea", minCarpetArea);
                filters.put("areaUnit",areaUnit);
            }else{
                filters.remove("areaUnit");
            }
            if (maxCarpetArea != null) filters.put("maxCarpetArea", maxCarpetArea);

            List<Property> filteredProperties = propertyServ.getFilteredProperties(filters);
            Map<String, Object> response = new HashMap<>();

//             Check for empty results
            if (filteredProperties.isEmpty() && (locations != null && !locations.isEmpty()) && (bedrooms != null && !bedrooms.isEmpty())) {
                String location = locations.get(0);
                int bedroom = bedrooms.get(0);
                filteredProperties = propertyServ.getApprovedPropertiesByLocationAndBedrooms(true, location, bedroom);
                log.warn("Retrieved properties by city and bedrooms");
                response.put("message", "All properties retrieved by city and bedrooms");
            } else {
                response.put("message", "All properties retrieved");
            }

            response.put("properties", filteredProperties);

            if (filteredProperties.isEmpty()) {
                response.put("message", "No properties found");
                log.warn("No properties found");
                return ResponseEntity.status(HttpStatus.OK).body(response);
            } else {
                log.info("Retrieved all properties");
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("An error occurred: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while processing the request.");
        }
    }

    @GetMapping(value = "/find")
    public ResponseEntity<?> getPropertiesByLocationAndBedrooms(@RequestParam String location, @RequestParam int bedrooms) {
        try {
            List<Property> properties = propertyServ.getPropertiesByLocationAndBedrooms(location,bedrooms);
            if (properties.isEmpty()) {
                log.warn("Properties in {} does not exists", location);
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
                    log.info("Retrieved all unapproved properties :{}", unApprovedProperties.size());
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
                    log.info("Retrieved all approved properties :{}", approvedProperties.size());
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

    @PostMapping(value = "/delete/{id}")
    public ResponseEntity<?> deleteProperty(@PathVariable String id){
        try{
            propertyServ.removeProperty(id);
            log.info("Property with ID : {} Deleted successfully",id);
            return  ResponseEntity.status(HttpStatus.OK).body("Property deleted successfully");
        }catch(Exception e){
            log.warn("An Error occurred : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }
}