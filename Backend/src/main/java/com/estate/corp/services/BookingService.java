package com.estate.corp.services;

import com.estate.corp.models.Booking;
import com.estate.corp.repositories.BookingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepo bookingRepo;

    public List<Booking> getAllBookings() {
        return bookingRepo.findAll();
    }

    public Booking createBooking(Booking booking) {
        Booking propertyBooking = new Booking();
        propertyBooking.setStatus(Booking.BookingStatus.PENDING);


        return bookingRepo.save(booking);
    }
}
