package com.estate.corp.services;

import com.estate.corp.models.Enquiry;
import com.estate.corp.models.Notification;
import com.estate.corp.repositories.NotificationRepo;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Random;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepo notificationRepo;

    @Autowired
    private JavaMailSender emailSender;

    public String notifyEnquiry(Notification notification) throws MessagingException{
        try {
            Enquiry enquiry = notification.getEnquiry();
            String userEmail = enquiry.getEmail();
            if (userEmail != null) {
                // Send email
                SimpleMailMessage message = new SimpleMailMessage();
                message.setFrom("kaushikkarnik635@gmail.com");
                message.setTo(userEmail);

                switch (notification.getSubject()) {
                    case PROJECT_ENQUIRY:
                        message.setSubject("Enquiry for Project");
                        message.setText("Your enquiry for Project : " + notification.getProjectName() + " has been successfully received");
                        break;
                    case PROPERTY_ENQUIRY:
                        message.setSubject("Enquiry for Property");
                        message.setText("Your enquiry for Property : " + notification.getPropertyName() + " has been successfully received");
                        break;
                    case CASUAL_ENQUIRY:
                        message.setSubject("Contact Enquiry");
                        message.setText("Your enquiry has been successfully received");
                        break;
                    case HOME_LOAN:
                        message.setSubject("Home Loan Enquiry");
                        message.setText("Your enquiry has been successfully received");
                        break;
                    case PACKING_MOVING:
                        message.setSubject("Packing & Moving Enquiry");
                        message.setText("Your enquiry has been successfully received");
                        break;
                    case INTERIOR_DESIGN:
                        message.setSubject("Interior Design Enquiry");
                        message.setText("Your enquiry has been successfully received");
                        break;
                    case LEGAL_ASSIST:
                        message.setSubject("Legal Assistance Enquiry");
                        message.setText("Your enquiry has been successfully received");
                        break;
                    case ACQUISITION:
                        message.setSubject("Land Acquisition Enquiry");
                        message.setText("Your enquiry has been successfully received");
                        break;
                    case REDEVELOPMENT:
                        message.setSubject("Redevelopment Enquiry");
                        message.setText("Your enquiry has been successfully received");
                        break;
                    case JV:
                        message.setSubject("Joint Venture Enquiry");
                        message.setText("Your enquiry has been successfully received");
                        break;
                    case FUNDING:
                        message.setSubject("Builder Funding Enquiry");
                        message.setText("Your enquiry has been successfully received");
                        break;
                    default:
                        throw new IllegalArgumentException("Unknown subject type: " + notification.getSubject());
                }
                emailSender.send(message);
            }
            notification.setSentDate(new Date());
            notificationRepo.save(notification);
            return "Enquiry mail successfully sent";

        } catch (Exception e) {
            throw new RuntimeException("Error during Sending notification : "+e.getMessage());
        }
    }

    public List<Notification> getAllNotifications(){
        List<Notification> notifications = notificationRepo.findAll();
        return notifications;
    }

}