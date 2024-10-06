package com.estate.corp.repositories;

import com.estate.corp.models.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepo extends JpaRepository<Property,String> , JpaSpecificationExecutor<Property> {

    Property findByName(String name);

    List<Property> findByDetailsLocationAndDetailsBedrooms(String location, int bedrooms);

    List<Property> findByDetailsIsApproved(boolean isApproved);

    List<Property> findByDetailsIsApprovedAndDetailsLocationAndDetailsBedrooms(boolean isApproved, String city, int bedrooms);
}
