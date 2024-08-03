package com.estate.corp.repositories;

import com.estate.corp.models.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepo extends JpaRepository<Payment,String> {
}
