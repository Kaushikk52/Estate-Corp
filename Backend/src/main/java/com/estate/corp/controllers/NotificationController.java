package com.estate.corp.controllers;

import com.estate.corp.models.Enquiry;
import com.estate.corp.models.Notification;
import com.estate.corp.services.NotificationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping(value = "/v1/api/enquiry")
public class NotificationController {

    @Autowired
    private NotificationService notificationServ;

    @PostMapping(value = "/email")
    public ResponseEntity<String> sendNotification(@RequestBody Notification notification) {
        try{
            String message = notificationServ.notifyEnquiry(notification);
            log.info("Notification for enquiry sent to {}",notification.getEnquiry().getEmail());
            return ResponseEntity.status(HttpStatus.OK).body(message);
        }catch (Exception e){
            log.warn("An Error occurred : {}",e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body(e.getMessage());
        }
    }

    @GetMapping(value = "/all")
    public ResponseEntity<?> getAllNotifications(){
        try{
            List<Notification> notifications = notificationServ.getAllNotifications();
            Map<String, Object> response = new HashMap<>();
            log.info("Notifications successfully retrieved");
            response.put("message","All Notifications Succesfully retrieved");
            response.put("notifications",notifications);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
