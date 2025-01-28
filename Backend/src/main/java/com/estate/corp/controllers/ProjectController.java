package com.estate.corp.controllers;

import com.estate.corp.models.Project;
import com.estate.corp.services.ProjectService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping(value = "/v1/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectServ;

    @GetMapping(value = "/all")
    public ResponseEntity<?> getAllProjects() {
        List<Project> projects = projectServ.getAllProjects();
        Map<String, Object> response = new HashMap<>();
        if (projects.isEmpty()) {
            log.warn("Property Repository is Empty");
            response.put("message", "No projects found");
            response.put("projects",projects);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(projects);
        }else{
            log.info("Retrieved all projects");
            response.put("message", "No projects found");
            response.put("projects",projects);
        }
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping(value = "/id/{id}")
    public ResponseEntity<?> getProjectById(@PathVariable String id){
        try{
            Project project = projectServ.getProjectById(id);
            log.info("Retrieved project with ID :{}", id);
            return ResponseEntity.status(HttpStatus.OK).body(project);
        }catch(Exception e){
            log.error("An Error occurred : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @GetMapping(value = "/name/{name}")
    public ResponseEntity<?> getProjectByName(@PathVariable String name){
        try{
            Project project = projectServ.getProjectByName(name);
            log.info("Retrieved project with Name :{}", name);
            return ResponseEntity.status(HttpStatus.OK).body(project);
        }catch(Exception e){
            log.error("An Error occurred : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PostMapping(value = "/add")
    public ResponseEntity<Project> saveProject(@RequestBody Project project, Principal principal) {
        try {
            projectServ.saveProject(project,principal);
            log.info("Project posted successfully : {}", project);
            return ResponseEntity.status(HttpStatus.CREATED).body(null);
        } catch (IllegalArgumentException e) {
            log.warn("An Error occurred : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }catch(Exception e){
            log.warn("An Error occurred : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }

    @GetMapping(value = "/filter")
    public ResponseEntity<?>  filterProjects(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String underConstruction,
            @RequestParam(required = false) List<String> locations,
            @RequestParam(required = false) Integer totalFloors,
            @RequestParam(required = false) List<Integer> bedrooms,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) String amtUnit,
            @RequestParam(required = false) Double minCarpetArea,
            @RequestParam(required = false) Double maxCarpetArea,
            @RequestParam(required =false) String areaUnit
    ){
        try{
            Map<String,Object> filters = new HashMap<>();
            if(type != null) filters.put("type",type);
            if(underConstruction != null) filters.put("underConstruction",underConstruction);
            if(totalFloors != null) filters.put("totalFloors",totalFloors);
            if (bedrooms != null) filters.put("bedrooms", bedrooms);
            if (locations != null && !locations.isEmpty()) filters.put("locations", locations);
            if (minPrice != null){
                filters.put("minPrice", minPrice);
                filters.put("amtUnit",amtUnit);
            }else{
                filters.remove("amtUnit");
            }
            if (maxPrice != null) filters.put("maxPrice", maxPrice);

            if (minCarpetArea != null) {
                filters.put("minCarpetArea", minCarpetArea);
                filters.put("areaUnit",areaUnit);
            }else{
                filters.remove("areaUnit");
            }
            if (maxCarpetArea != null) filters.put("maxCarpetArea", maxCarpetArea);

            List<Project> filteredProjects = projectServ.getFilteredProjects(filters);
            Map<String, Object> response = new HashMap<>();

            response.put("projects", filteredProjects);

            if (filteredProjects.isEmpty()) {
                response.put("message", "No projects found");
                log.warn("No projects found");
                return ResponseEntity.status(HttpStatus.OK).body(response);
            } else {
                log.info("Retrieved all projects");
            }
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("An error occurred: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while processing the request.");
        }
    }

    @PostMapping(value = "/delete/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable String id){
        try{
            projectServ.deleteProject(id);
            log.info("Project with ID : {} Deleted successfully",id);
            return  ResponseEntity.status(HttpStatus.OK).body("Project deleted successfully");
        }catch(Exception e){
            log.warn("An Error occurred : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }
    }



}