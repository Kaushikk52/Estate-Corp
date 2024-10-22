package com.estate.corp.repositories;

import com.estate.corp.models.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepo extends JpaRepository<Address,String> {
}