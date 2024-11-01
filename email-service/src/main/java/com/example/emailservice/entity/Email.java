package com.example.emailservice.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
// import jakarta.validation.constraints.Email; // unnecessary import due to fully qualified annotation

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "emails")
public class Email {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Sender email is required")
    @jakarta.validation.constraints.Email(message = "Invalid email format") // use full annotation since entity name Email.java is the same as the annotation @Email
    private String sender;

    @NotBlank(message = "Recipient email is required")
    @jakarta.validation.constraints.Email(message = "Invalid email format") // use full annotation since entity name Email.java is the same as the annotation @Email
    private String recipient;

    @Size(max = 100, message = "Subject must be 100 characters or fewer")
    private String subject;

    @Size(max = 20000, message = "Body cannot exceed 20000 characters")
    private String body;

    private LocalDateTime receivedAt;

//    @OneToMany(mappedBy = "email", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
//    private List<Attachment> attachments;
    private List<Long> attachmentIds = new ArrayList<>();

    public Email() {
        // By default, initialize the attachmentIds list as empty
        this.attachmentIds = new ArrayList<>();
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getRecipient() {
        return recipient;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public LocalDateTime getReceivedAt() {
        return receivedAt;
    }

    public void setReceivedAt(LocalDateTime receivedAt) {
        this.receivedAt = receivedAt;
    }

    public List<Long> getAttachmentIds() {
        return attachmentIds;
    }

    public void setAttachmentIds(List<Long> attachmentIds) {
        this.attachmentIds = attachmentIds;
    }

    public void addAttachmentIds(List<Long> attachmentIds) {
        if (this.attachmentIds != null) {
            this.attachmentIds.addAll(attachmentIds);
        } else {
            this.attachmentIds = attachmentIds;
        }
    }
}
