package com.estate.corp.controllers;

import com.estate.corp.models.Project;
import com.estate.corp.services.ProjectService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/v1/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectServ;

    @GetMapping(value = "/all")
    public ResponseEntity<List<Project>> getAllProjects() {
        List<Project> projects = projectServ.getAllProjects();
        if (projects.isEmpty()) {
            log.warn("Property Repository is Empty");
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(projects);
        }
        log.info("Retrieved all projects :{}", projects);
        return ResponseEntity.status(HttpStatus.OK).body(projects);
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

}
