package com.estate.corp.specifications;

import com.estate.corp.models.Project;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ProjectSpecification {

    public static Specification<Project> filterByCriteria(Map<String, Object> filters) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Always filter for approved projects
//            predicates.add(criteriaBuilder.equal(root.get("details").get("isApproved"), true));

            if(filters.containsKey("type")){
                String type = (String) filters.get("type");
                predicates.add(criteriaBuilder.equal(root.get("type"),type));
            }

            if(filters.containsKey("underConstruction")){
                String underConstruction = (String) filters.get("underConstruction");
                predicates.add(criteriaBuilder.equal(root.get("underConstruction"),underConstruction));
            }

            if(filters.containsKey("totalFloors")){
                Integer totalFloors = (Integer) filters.get("totalFloors");
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("totalFloors"),totalFloors));
            }

            // Handle cities (OR condition if multiple cities)
            if (filters.containsKey("locations")) {
                List<String> locations = (List<String>) filters.get("locations");
                predicates.add(root.get("location").in(locations));
            }

            // Handle bedrooms (List of values)
            if (filters.containsKey("bedrooms")) {
                List<Integer> bedrooms = (List<Integer>) filters.get("bedrooms");
                Predicate bedroomPredicate = root.get("floorPlans").get("bedrooms").in(bedrooms);
                predicates.add(bedroomPredicate);
            }

            // Handle price filters
            if (filters.containsKey("minPrice")) {
                Double minPrice = (Double) filters.get("minPrice");
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("floorPlans").get("price"), minPrice));
            }

            if (filters.containsKey("maxPrice")) {
                Double maxPrice = (Double) filters.get("maxPrice");
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("floorPlans").get("price"), maxPrice));
            }

            // Handle amtUnit filter (inside details embeddable)
            if (filters.containsKey("amtUnit")) {
                String amtUnit = (String) filters.get("amtUnit");
                Predicate amtUnitPredicate = criteriaBuilder.equal(root.get("floorPlans").get("amtUnit"), amtUnit);
                predicates.add(amtUnitPredicate);
            }

            // Handle carpet area filters
            if (filters.containsKey("minCarpetArea")) {
                Double minCarpetArea = (Double) filters.get("minCarpetArea");
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("floorPlans").get("carpetArea"), minCarpetArea));
            }

            if (filters.containsKey("maxCarpetArea")) {
                Double maxCarpetArea = (Double) filters.get("maxCarpetArea");
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("floorPlans").get("carpetArea"), maxCarpetArea));
            }

            // Correcting area unit check - ensure you check against areaUnit, not carpetArea
            if (filters.containsKey("areaUnit")) {
                String areaUnit = (String) filters.get("areaUnit");
                Predicate areaUnitPredicate = criteriaBuilder.equal(root.get("floorPlans").get("areaUnit"), areaUnit);
                predicates.add(areaUnitPredicate);
            }

            // Combine all predicates with AND operator
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
