package com.taa.content.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taa.content.model.Contact;
import com.taa.content.service.ContactService;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin
public class ContactController {

    @Autowired
    private ContactService service;

    @PostMapping
    public ResponseEntity<String> submitContact(@RequestBody Contact request) {

        if (request.getName() == null || request.getPhone() == null) {
            return ResponseEntity.badRequest().body("Invalid input");
        }

        service.saveAndNotify(request);
        return ResponseEntity.ok("Callback request submitted successfully");
    }
}
