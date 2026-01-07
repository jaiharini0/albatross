package com.taa.content.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.taa.content.model.Contact;
import com.taa.content.repository.ContactRepository;

import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

@Service
public class ContactService {

    @Autowired
    private ContactRepository repository;

    @Autowired
    private JavaMailSender mailSender;

    @Value("${app.mail.admin}")
    private String adminEmail;

    @Value("${spring.mail.username}")
    private String senderEmail;

    public void saveAndNotify(Contact request) {
        repository.save(request);
        sendEmailToAdmin(request);
        sendAutoReplyToUser(request);
    }

    private void sendEmailToAdmin(Contact r) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, false, "UTF-8");

            // 👇 HERE is where you add the name
            helper.setFrom(new InternetAddress(
                    senderEmail,
                    "The Albatross Associates"
            ));

            helper.setTo(adminEmail);
            helper.setSubject("New Callback Request");

            helper.setText(
                    "User Enquiry through Website\n\n" +
                    "Name: " + r.getName() + "\n" +
                    "Email: " + r.getEmail() + "\n" +
                    "Phone: " + r.getPhone() + "\n" +
                    "Service: " + r.getService(),
                    false
            );

            mailSender.send(message);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void sendAutoReplyToUser(Contact r) {
    try {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, false, "UTF-8");

        helper.setFrom(new InternetAddress(
                senderEmail,
                "The Albatross Associates"
        ));

        helper.setTo(r.getEmail());
        helper.setSubject("Thank you for contacting The Albatross Associates");
        helper.setText(
            "Dear " + r.getName() + ",\n\n" +
            "Thank you for reaching out to The Albatross Associates.\n\n" +
            "We have received your request regarding \"" + r.getService() + "\".\n" +
            "Our team will contact you shortly.\n\n" +
            "Regards,\n" +
            "The Albatross Associates\n" +
            "📞 +91-8110000313\n" +
            "🌐 https://thealbatrossassociates.com"
        );
        mailSender.send(message);

    } catch (Exception e) {
        e.printStackTrace();
    }
}

}

