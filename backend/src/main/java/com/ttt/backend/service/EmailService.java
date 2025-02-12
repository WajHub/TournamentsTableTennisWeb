package com.ttt.backend.service;

import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.sendgrid.*;
import java.io.IOException;

@Service
public class EmailService {

    @Value("${security.sendgrid.api-key}")
    private String api_key;

    private final Email emailFrom = new Email("amdministator.ttt@gmail.com");

    public void sendEmail(String to, String subject, String userName, String token) throws IOException {
        Email emailTo = new Email(to);
        Content emailContent = new Content(
                "text/html",
                getTemplate(userName, token, subject));
        Mail mail = new Mail(emailFrom, subject, emailTo, emailContent);

        SendGrid sg = new SendGrid(api_key);
        Request request = new Request();
        request.setMethod(Method.POST);
        request.setEndpoint("mail/send");
        request.setBody(mail.build());
        Response response = sg.api(request);
        response.getStatusCode();
    }

    private static String getTemplate(String userName, String confirmationToken, String subject) {
        String verificationLink = "http://localhost:3000/confirm_email?token=" + confirmationToken;
        return "<html>"
                + "<body style=\"font-family: Arial, sans-serif;\">"
                + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                + "<h2 style=\"color: #333;\">Welcome to our app "+userName+"!</h2>"
                + "<p style=\"font-size: 16px;\">Please enter the verification code below to continue:</p>"
                + "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
                + "<p><a href=\"" + verificationLink + "\" style=\"font-size: 18px; font-weight: bold; color: #007bff; text-decoration: none;\">"+subject+"</a></p>"
                + "<p style=\"font-size: 18px; font-weight: bold; color: #007bff;\">" + "</p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";
    }
}
