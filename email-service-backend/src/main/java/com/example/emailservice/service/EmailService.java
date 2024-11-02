package com.example.emailservice.service;

import com.example.emailservice.entity.Attachment;
import com.example.emailservice.entity.Email;
import com.example.emailservice.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class EmailService {

    private final EmailRepository emailRepository;
    private final AttachmentRepository attachmentRepository;

    @Autowired
    public EmailService(EmailRepository emailRepository, AttachmentRepository attachmentRepository) {
        this.emailRepository = emailRepository;
        this.attachmentRepository = attachmentRepository;
    }

    public Email saveEmail(Email email) {
        email.setReceivedAt(LocalDateTime.now());
        return emailRepository.save(email); // Saving the email to the database; automatically creates ID
    }

    // Get all emails
    public List<Email> getAllEmails() {
        return emailRepository.findAll();
    }

    // Get an email by id
    public Optional<Email> getEmailById(Long id) {
        return emailRepository.findById(id);
    }

    // Update email
    public Email updateEmail(Long id, Email updatedEmail) {
        Optional<Email> optionalEmail = emailRepository.findById(id);
        if (optionalEmail.isPresent()) {
            Email email = optionalEmail.get();
            email.setSender(updatedEmail.getSender());
            email.setRecipient(updatedEmail.getRecipient());
            email.setSubject(updatedEmail.getSubject());
            email.setBody(updatedEmail.getBody());
            if (updatedEmail.getReceivedAt() != null) {
                email.setReceivedAt(updatedEmail.getReceivedAt());
            } else {
                email.setReceivedAt(LocalDateTime.now());
            }
            if (updatedEmail.getAttachmentIds() != null) {
                email.setAttachmentIds(updatedEmail.getAttachmentIds());
            }
            return emailRepository.save(email);
        } else {
            throw new NoSuchElementException("Email not found with id: " + id);
        }
    }

    // Delete email by id
    public boolean deleteEmail(Long id) {
        if (emailRepository.existsById(id)) {
            List<Attachment> attachments = attachmentRepository.findByEmailId(id);
            if (!attachments.isEmpty()) {
                attachmentRepository.deleteAll(attachments);
            }
            emailRepository.deleteById(id);
            return true;
        } else {
            throw new NoSuchElementException("Email not found with id: " + id);
        }
    }
}
