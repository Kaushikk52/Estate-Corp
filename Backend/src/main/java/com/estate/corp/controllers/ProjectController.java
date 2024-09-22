package com.estate.corp.controllers;

import com.estate.corp.models.Project;
import com.estate.corp.services.ProjectService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/v1/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectServ;

    @GetMapping(value = "/all")
    public ResponseEntity<List<Project>> getAllProperties() {
        List<Project> projects = projectServ.getAllProjects();
        if (projects.isEmpty()) {
            log.warn("Property Repository is Empty");
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(projects);
        }
        log.info("Retrieved all projects :{}", projects);
        return ResponseEntity.status(HttpStatus.OK).body(projects);
    }


}
