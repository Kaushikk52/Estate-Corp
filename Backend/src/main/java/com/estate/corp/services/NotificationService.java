package com.estate.corp.services;

import com.estate.corp.repositories.NotificationRepo;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepo notificationRepo;

    @Autowired
    private JavaMailSender emailSender;

    public String notifyBooking(String email) throws MessagingException{
        try {
            if (email != null) {
                // Send email
                SimpleMailMessage message = new SimpleMailMessage();
                message.setFrom("kaushikkarnik635@gmail.com");
                message.setTo(email);
                message.setSubject("Booking Successfully done");
                message.setText("You're Booking has been received");
                emailSender.send(message);
            }
            return "Booking Successfully done";

        } catch (Exception e) {
            throw new RuntimeException("Error during Sending notification : "+e.getMessage());
        }
    }

}
