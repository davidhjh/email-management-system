package com.example.emailservice.controller;

import com.example.emailservice.entity.Attachment;
import com.example.emailservice.entity.Email;
import com.example.emailservice.service.AttachmentService;
import com.example.emailservice.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/emails")
@CrossOrigin(origins = "http://localhost:3000")
public class EmailController {

    private final EmailService emailService;
    private final AttachmentService attachmentService;

    @Autowired
    public EmailController(EmailService emailService, AttachmentService attachmentService) {
        this.emailService = emailService;
        this.attachmentService = attachmentService;
    }

    @GetMapping
    public List<Email> getAllEmails() {
        return emailService.getAllEmails();
    }

    // GET request to fetch an email by ID
    @GetMapping("/{id}")
    public ResponseEntity<Email> getEmailById(@PathVariable Long id) {
        Optional<Email> email = emailService.getEmailById(id);
        if (email.isPresent()) {
            return ResponseEntity.ok(email.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/")
    public ResponseEntity<Email> saveEmail(@RequestParam String sender,
                                           @RequestParam String recipient,
                                           @RequestParam String subject,
                                           @RequestParam String body,
                                           @RequestParam(value = "attachments", required = false) MultipartFile[] attachments) {

        Email email = new Email();
        email.setSender(sender);
        email.setRecipient(recipient);
        email.setSubject(subject);
        email.setBody(body);
        Email savedEmail = emailService.saveEmail(email);

        // Handle attachments
        if (attachments != null) {
            List<Long> attachmentIds = new ArrayList<>();
            for (MultipartFile file : attachments) {
                Attachment attachment = new Attachment();
                attachment.setFileName(file.getOriginalFilename());
                attachment.setFileType(file.getContentType());
                try {
                    attachment.setData(file.getBytes());
                } catch (IOException e) {
                    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
                attachment.setEmailId(email.getId());
                attachmentService.saveAttachment(attachment);
                attachmentIds.add(attachment.getId());
            }
            savedEmail.addAttachmentIds(attachmentIds);
        }

        // using updatedEmail because the attachmentIds need to be added after the attachments get saved
        Email updatedEmail = emailService.updateEmail(savedEmail.getId(), savedEmail);
        return new ResponseEntity<>(updatedEmail, HttpStatus.CREATED);
    }

    // PUT request to update an email by ID
    @PutMapping("/{id}")
    public ResponseEntity<Email> updateEmail(@PathVariable Long id,
                                             @RequestParam String sender,
                                             @RequestParam String recipient,
                                             @RequestParam String subject,
                                             @RequestParam String body,
                                             @RequestParam(required = false) MultipartFile[] attachments) {

        Email email = new Email();
        email.setSender(sender);
        email.setRecipient(recipient);
        email.setSubject(subject);
        email.setBody(body);

        // Handle attachments
        if (attachments != null) {
            List<Long> attachmentIds = new ArrayList<>();
            for (MultipartFile file : attachments) {
                Attachment attachment = new Attachment();
                attachment.setFileName(file.getOriginalFilename());
                attachment.setFileType(file.getContentType());
                try {
                    attachment.setData(file.getBytes());
                } catch (IOException e) {
                    return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
                }
                attachment.setEmailId(id);
                attachmentService.saveAttachment(attachment);
                attachmentIds.add(attachment.getId());
            }
            email.setAttachmentIds(attachmentIds);
        }
        Email updatedEmail = emailService.updateEmail(id, email);
        return updatedEmail != null ? ResponseEntity.ok(updatedEmail) : ResponseEntity.notFound().build();
    }

    // DELETE request to delete an email by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmail(@PathVariable Long id) {
        boolean deleted = emailService.deleteEmail(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}
