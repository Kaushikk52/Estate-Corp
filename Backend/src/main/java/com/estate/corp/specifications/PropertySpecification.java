package com.estate.corp.specifications;

import com.estate.corp.models.Property;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.Predicate;

import java.util.ArrayList;
import java.util.List;

public class PropertySpecification {

    public static Specification<Property> filterByCriteria(
            Integer bedrooms,
            Double minPrice,
            Double maxPrice,
            List<String> cities,
            Double minCarpetArea,
            Double maxCarpetArea) {

        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Join with Project for filtering by cities (Address is embedded in both Project and Property)
            if (cities != null && !cities.isEmpty()) {
                predicates.add(root.join("project").get("address").get("city").in(cities));
            }

            // Filter by bedrooms
            if (bedrooms != null) {
                predicates.add(criteriaBuilder.equal(root.get("details").get("bedrooms"), bedrooms));
            }

            // Filter by price (min-max)
            if (minPrice != null && maxPrice != null) {
                predicates.add(criteriaBuilder.between(root.get("details").get("price"), minPrice, maxPrice));
            } else if (minPrice != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("details").get("price"), minPrice));
            } else if (maxPrice != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("details").get("price"), maxPrice));
            }

            // Filter by carpet area (min-max)
            if (minCarpetArea != null && maxCarpetArea != null) {
                predicates.add(criteriaBuilder.between(root.get("details").get("carpetArea"), minCarpetArea, maxCarpetArea));
            } else if (minCarpetArea != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("details").get("carpetArea"), minCarpetArea));
            } else if (maxCarpetArea != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("details").get("carpetArea"), maxCarpetArea));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
