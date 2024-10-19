import React, { useState } from "react";
import axios from "axios";

const UpdateEmailForm = () => {
  const [emailId, setEmailId] = useState("");
  const [emailData, setEmailData] = useState({
    sender: "",
    recipient: "",
    subject: "",
    body: "",
  });

  const handleChange = (e) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };

  const [attachments, setAttachments] = useState(null);

  const handleFileChange = (e) => {
    setAttachments(e.target.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    // packaging email details and optional attachments to formData
    formData.append("sender", emailData.sender);
    formData.append("recipient", emailData.recipient);
    formData.append("subject", emailData.subject);
    formData.append("body", emailData.body);

    if (attachments) {
      // Add multiple files if provided (not implemented yet)
      for (let i = 0; i < attachments.length; i++) {
        formData.append('attachments', attachments[i]);
      }
    }

    axios.put(`http://localhost:8080/api/emails/${emailId}`, formData)
      .then((response) => {
        alert("Email updated successfully!");
      })
      .catch((error) => {
        console.error("There was an error updating the email!", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update email by given ID</h2>
      <div>
        <input
          type="text"
          placeholder="Enter Email ID to update"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />
      </div>

      <div>
        <input
          type="text"
          name="sender"
          placeholder="Sender"
          value={emailData.sender}
          onChange={handleChange}
        />
      </div>

      <div>
        <input
            type="text"
            name="recipient"
            placeholder="Recipient"
            value={emailData.recipient}
            onChange={handleChange}
          />
      </div>

      <div>
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={emailData.subject}
          onChange={handleChange}
        />
      </div>

      <div>
        <textarea
          name="body"
          placeholder="Body"
          value={emailData.body}
          onChange={handleChange}
        />
      </div>

      <div>
        <p>Add attachment (optional)</p>
        <input type="file" multiple onChange={handleFileChange} />
      </div>

      <button type="submit">Update Email</button>
    </form>
  );
};

export default UpdateEmailForm;
