package com.estate.corp.services;

import com.estate.corp.models.Address;
import com.estate.corp.models.Property;
import com.estate.corp.models.PropertyDetails;
import com.estate.corp.models.User;
import com.estate.corp.repositories.AddressRepo;
import com.estate.corp.repositories.PropertyRepo;
import com.estate.corp.specifications.PropertySpecification;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.io.IOException;
import java.security.Principal;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class PropertyServices {

    @Autowired
    private PropertyRepo propertyRepo;

    @Autowired
    private AddressRepo addressRepo;

    @Autowired
    private ImageService imageServ;

    @Autowired
    private UserService userServ;

    @Value("${imgUrl.source.path}")
    private String sourceUrl;
    @Value("${imgUrl.destination.path}")
    private String destinationUrl;

    @Transactional
    public Property saveProperty(Property property, Principal principal) throws IOException {
        Address savedAddress = addressRepo.save(property.getAddress());
        User currentUser = (User) userServ.loadUserByUsername(principal.getName());
        if(Objects.equals(currentUser.getRole().toString(), "ROLE_ADMIN")){
            PropertyDetails details = property.getDetails();
            details.setIsApproved(true);
            property.setDetails(details);

        }
        property.setOwner(currentUser);
        property.setCreatedAt(new Date());
        property.setUpdatedAt(new Date());
        property.setAddress(savedAddress);
        Property savedProperty = propertyRepo.save(property);
        return savedProperty;
    }

    public List<Property> getAllProperties(int pageNo, int pageSize) {
        return propertyRepo.findAll();
    }

    public Property getPropertyById(String id){
        return propertyRepo.findById(id).orElseThrow(()-> new RuntimeException("Property not found..."));
    }

    public Property getPropertyByName(String name){
        return propertyRepo.findByName(name);
    }

    public List<Property> getPropertiesByLocationAndBedrooms(String city,int bedrooms){
        return propertyRepo.findByDetailsLocationAndDetailsBedrooms(city,bedrooms);
    }

    public List<Property> getApprovedPropertiesByLocationAndBedrooms(boolean isApproved,String location,int bedrooms){
        return propertyRepo.findByDetailsIsApprovedAndDetailsLocationAndDetailsBedrooms(isApproved,location,bedrooms);
    }

    public List<Property> getPropertiesByApprovalStatus(boolean isApproved){
        return propertyRepo.findByDetailsIsApproved(isApproved);
    }

    public List<Property> getFilteredProperties(Map<String,Object> filters) {
        Specification<Property> spec = PropertySpecification.filterByCriteria(filters);
        List<Property> filteredProperties =  propertyRepo.findAll(spec);
        return filteredProperties;
    }

    public Property changeApprovalStatus(String id){
        Property property = propertyRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Property with ID: " + id + " not found"));
        PropertyDetails details = property.getDetails();
        details.setIsApproved(!details.getIsApproved());
        return propertyRepo.save(property);
    }

    public void removeProperty(String id){
        Property property = propertyRepo.findById(id).orElseThrow(()-> new RuntimeException("Property not Found"));
        propertyRepo.delete(property);
    }

}