package com.estate.corp.specifications;
import com.estate.corp.models.Property;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.Predicate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class PropertySpecification {

    public static Specification<Property> filterByCriteria(Map<String, Object> filters) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Always filter for approved properties
            predicates.add(criteriaBuilder.equal(root.get("details").get("isApproved"), true));

            if(filters.containsKey("type")){
                String type = (String) filters.get("type");
                predicates.add(criteriaBuilder.equal(root.get("type"),type));
            }

            // Handle bedrooms (List of values)
            if (filters.containsKey("bedrooms")) {
                List<Integer> bedrooms = (List<Integer>) filters.get("bedrooms");
                Predicate bedroomPredicate = root.get("details").get("bedrooms").in(bedrooms);
                predicates.add(bedroomPredicate);
            }

            // Handle price filters
            if (filters.containsKey("minPrice")) {
                Double minPrice = (Double) filters.get("minPrice");
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("details").get("price"), minPrice));
            }

            if (filters.containsKey("maxPrice")) {
                Double maxPrice = (Double) filters.get("maxPrice");
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("details").get("price"), maxPrice));
            }

            // Handle amtUnit filter (inside details embeddable)
            if (filters.containsKey("amtUnit")) {
                String amtUnit = (String) filters.get("amtUnit");
                Predicate amtUnitPredicate = criteriaBuilder.equal(root.get("details").get("amtUnit"), amtUnit);
                predicates.add(amtUnitPredicate);
            }

            // Handle cities (OR condition if multiple cities)
            if (filters.containsKey("locations")) {
                List<String> locations = (List<String>) filters.get("locations");
                predicates.add(root.join("details").get("location").in(locations));
            }

            // Handle carpet area filters
            if (filters.containsKey("minCarpetArea")) {
                Double minCarpetArea = (Double) filters.get("minCarpetArea");
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("details").get("carpetArea"), minCarpetArea));
            }

            if (filters.containsKey("maxCarpetArea")) {
                Double maxCarpetArea = (Double) filters.get("maxCarpetArea");
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("details").get("carpetArea"), maxCarpetArea));
            }

            // Correcting area unit check - ensure you check against areaUnit, not carpetArea
            if (filters.containsKey("areaUnit")) {
                String areaUnit = (String) filters.get("areaUnit");
                Predicate areaUnitPredicate = criteriaBuilder.equal(root.get("details").get("areaUnit"), areaUnit);
                predicates.add(areaUnitPredicate);
            }

            // Combine all predicates with AND operator
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
