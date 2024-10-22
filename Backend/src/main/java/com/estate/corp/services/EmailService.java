package com.estate.corp.services;

import com.estate.corp.models.User;
import com.estate.corp.repositories.UserRepo;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private UserRepo userRepo;

    public String sendOTP(String userEmail) throws MessagingException {
        User user = userRepo.findByEmail(userEmail);
        String otp = "";
        if(user!=null){
            // Generate OTP
            otp = generateOTP();

            // Send email
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("kaushikkarnik635@gmail.com");
            message.setTo(userEmail);
            message.setSubject("Password Change OTP");
            message.setText("Your OTP is: " + otp);
            emailSender.send(message);
            return otp;
        }else{
            throw new RuntimeException("Invalid Email!");
        }
    }

    private String generateOTP() {
        // Generate a 6-digit OTP
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }


}