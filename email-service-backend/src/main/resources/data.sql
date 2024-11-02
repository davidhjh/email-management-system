-- Insert sample emails
INSERT INTO emails (sender, recipient, subject, body, attachment_ids, received_at) VALUES
('john@example.com', 'alice@example.com', 'Welcome!', 'Welcome to our service!', '{1}', NOW()),
('mary@example.com', 'bob@example.com', 'Meeting', 'Reminder for tomorrow''s meeting.', '{2}', NOW()),
('send@email.com', 'receive@email.com', 'Has Attachment', 'This email has an attachment.', '{3}', NOW()),
('attachmentless@email.com', 'trash@email.com', 'Attachmentless', 'This email does not have an attachment.', '{}', NOW());

-- Insert sample attachments
INSERT INTO attachments (file_name, file_type, data, email_id) VALUES
('welcome.pdf', 'application/pdf', '\\x255044462d312e350a25d0d4c5d80a34', 1),
('meeting.jpg', 'image/jpeg', '\\xffd8ffe000104a46494600010101006000600000ffdb0043000d090a', 2),
('file1.txt', 'text/plain', decode('SGVsbG8gd29ybGQ=', 'base64'), 3);

