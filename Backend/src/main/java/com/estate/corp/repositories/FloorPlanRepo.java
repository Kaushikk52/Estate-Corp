package com.estate.corp.repositories;

import com.estate.corp.models.FloorPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FloorPlanRepo extends JpaRepository<FloorPlan,String> {
}