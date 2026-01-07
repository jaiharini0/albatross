package com.taa.content.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taa.content.model.Quote;
import com.taa.content.service.QuoteService;

@RestController
@RequestMapping("/api/quote")
@CrossOrigin 
public class QuoteController {

    @Autowired
    private QuoteService service;

    @PostMapping("/submit")
    public ResponseEntity<String> submitQuote(@RequestBody Quote quote) {
        try {
            service.saveAndNotify(quote);
            return ResponseEntity.ok("Quote request submitted successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to submit quote. Please try again.");
        }
    }
}
