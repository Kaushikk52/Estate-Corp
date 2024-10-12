package com.estate.corp.services;

import com.estate.corp.models.FloorPlan;
import com.estate.corp.repositories.FloorPlanRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FloorPlanServices {

    @Autowired
    private FloorPlanRepo floorPlanRepo;

    public List<FloorPlan> addFloorPlans(List<FloorPlan> plans){
        List<FloorPlan> savedPlans = floorPlanRepo.saveAll(plans);
        return savedPlans;
    }

}
