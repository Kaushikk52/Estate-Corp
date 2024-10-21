package com.estate.corp.specifications;

import com.estate.corp.models.Property;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class PropertySpecification {

    public static Specification<Property> filterByCriteria(Map<String, Object> filters) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Add predicates based on the non-null filters
            if (filters.containsKey("bedrooms")) {
                Integer bedrooms = (Integer) filters.get("bedrooms");
                predicates.add(criteriaBuilder.equal(root.get("details").get("bedrooms"), bedrooms));
            }

            if (filters.containsKey("minPrice")) {
                Double minPrice = (Double) filters.get("minPrice");
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("details").get("price"), minPrice));
            }

            if (filters.containsKey("maxPrice")) {
                Double maxPrice = (Double) filters.get("maxPrice");
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("details").get("price"), maxPrice));
            }

            if (filters.containsKey("cities")) {
                List<String> cities = (List<String>) filters.get("cities");
//                predicates.add(root.join("project").join("address").get("city").in(cities));
                predicates.add(root.join("details").get("city").in(cities));
            }

            if (filters.containsKey("minCarpetArea")) {
                Double minCarpetArea = (Double) filters.get("minCarpetArea");
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("details").get("carpetArea"), minCarpetArea));
            }

            if (filters.containsKey("maxCarpetArea")) {
                Double maxCarpetArea = (Double) filters.get("maxCarpetArea");
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("details").get("carpetArea"), maxCarpetArea));
            }

            // Combine all predicates with AND operator
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
