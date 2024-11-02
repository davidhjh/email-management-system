package com.example.emailservice.repository;

import com.example.emailservice.entity.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttachmentRepository extends JpaRepository<Attachment, Long> {
    // Method to find all attachments for a given emailId
    List<Attachment> findByEmailId(Long emailId);
}
