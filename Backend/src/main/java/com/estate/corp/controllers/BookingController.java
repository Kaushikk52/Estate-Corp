package com.estate.corp.controllers;

import com.estate.corp.models.Booking;
import com.estate.corp.services.BookingService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/v1/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingServ;

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingServ.getAllBookings();
    }

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingServ.createBooking(booking);
    }

}
