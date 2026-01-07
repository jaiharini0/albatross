package com.taa.content.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.taa.content.model.Quote;
import com.taa.content.repository.QuoteRepository;

import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

@Service
public class QuoteService {

    @Autowired
    private QuoteRepository repository;

    @Autowired
    private JavaMailSender mailSender;

    @Value("${app.mail.admin}")
    private String adminEmail;

    @Value("${spring.mail.username}")
    private String senderEmail;

    public void saveAndNotify(Quote quote) {
        repository.save(quote);
        sendEmailToAdmin(quote);
        sendAutoReplyToUser(quote);
    }

    private void sendEmailToAdmin(Quote q) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, false, "UTF-8");

            helper.setFrom(new InternetAddress(senderEmail, "The Albatross Associates"));
            helper.setTo(adminEmail);
            helper.setSubject("New Insurance Quote Request");

            helper.setText(
                "Quote Request Details:\n\n" +
                "Full Name: " + q.getFullName() + "\n" +
                "Age: " + q.getAge() + "\n" +
                "Email: " + q.getEmail() + "\n" +
                "Monthly Income: ₹" + q.getMonthlyIncome() + "\n" +
                "Mobile: " + q.getMobile() + "\n" +
                "Plan Type: " + q.getPlanType(),
                false
            );

            mailSender.send(message);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void sendAutoReplyToUser(Quote q) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, false, "UTF-8");

            helper.setFrom(new InternetAddress(senderEmail, "The Albatross Associates"));
            helper.setTo(q.getEmail()); // or if you collect email in the quote form, use that
            helper.setSubject("Your Insurance Quote Request");

            helper.setText(
                "Dear " + q.getFullName() + ",\n\n" +
                "Thank you for requesting a insurance quote.\n" +
                "We will contact you shortly with the best insurance options for \"" + q.getPlanType() + "\".\n\n" +
                "Regards,\nThe Albatross Associates\n📞 +91-8110000313\n🌐 https://thealbatrossassociates.com"
            );

            mailSender.send(message);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
