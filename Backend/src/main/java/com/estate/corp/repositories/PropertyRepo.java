package com.estate.corp.repositories;

import com.estate.corp.models.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PropertyRepo extends JpaRepository<Property,String> {



}
