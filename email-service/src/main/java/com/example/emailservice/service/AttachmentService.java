package com.example.emailservice.service;

import com.example.emailservice.entity.Attachment;
import com.example.emailservice.repository.AttachmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AttachmentService {

    private final AttachmentRepository attachmentRepository;

    @Autowired
    public AttachmentService(AttachmentRepository attachmentRepository) {
        this.attachmentRepository = attachmentRepository;
    }

    // Save a new attachment
    public Attachment saveAttachment(Attachment attachment) {
        return attachmentRepository.save(attachment);
    }

    // Get attachment by ID
    public Optional<Attachment> getAttachmentById(Long attachmentId) {
        return attachmentRepository.findById(attachmentId);
    }

    // Get all attachments by email ID
    public List<Attachment> getAttachmentsByEmailId(Long emailId) {
        return attachmentRepository.findByEmailId(emailId);
    }

    // Delete an attachment by ID
    public void deleteAttachmentById(Long attachmentId) {
        attachmentRepository.deleteById(attachmentId);
    }

    // Delete all attachments for a specific email ID
    public void deleteAttachmentsByEmailId(Long emailId) {
        List<Attachment> attachments = attachmentRepository.findByEmailId(emailId);
        attachmentRepository.deleteAll(attachments);
    }

    // Update an existing attachment
    public Attachment updateAttachment(Attachment attachment) {
        return attachmentRepository.save(attachment);
    }
}