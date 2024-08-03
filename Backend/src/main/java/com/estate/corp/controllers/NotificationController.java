package com.estate.corp.controllers;

import com.estate.corp.models.Notification;
import com.estate.corp.services.NotificationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping(value = "/v1/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationServ;

    @PostMapping(value = "/booking")
    public ResponseEntity<String> sendNotification(@RequestBody Notification notification) {
        try{
            String userEmail = notification.getUser().getEmail();
            String message = notificationServ.notifyBooking(userEmail);
            log.info("Notification for successful booking sent to {}",userEmail);
            return ResponseEntity.status(HttpStatus.OK).body(message);
        }catch (Exception e){
            log.warn("An Error occurred : {}",e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body(e.getMessage());
        }
    }

}
