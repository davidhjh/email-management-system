import React, { useState } from "react";
import axios from "axios";

const AddEmailForm = () => {
  const [email, setEmail] = useState({
    sender: "",
    recipient: "",
    subject: "",
    body: "",
  });

  const handleChange = (e) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
  };

  const [attachments, setAttachments] = useState(null);

  const handleFileChange = (e) => {
    setAttachments(e.target.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    // packaging email details and optional attachments to formData
    formData.append("sender", email.sender);
    formData.append("recipient", email.recipient);
    formData.append("subject", email.subject);
    formData.append("body", email.body);

    if (attachments) {
      // Add multiple files if provided (not implemented yet)
      for (let i = 0; i < attachments.length; i++) {
        formData.append('attachments', attachments[i]);
      }
    }

    axios.post("http://localhost:8080/api/emails/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }) 
      .then((response) => {
        alert("Email added successfully!");
      })
      .catch((error) => {
        console.error("There was an error adding the email!", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add email</h2>
      <div>
        <input
          type="text"
          name="sender"
          placeholder="Sender"
          value={email.sender}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <input
          type="text"
          name="recipient"
          placeholder="Recipient"
          value={email.recipient}
          onChange={handleChange}
        />
      </div>

      <div>
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={email.subject}
          onChange={handleChange}
        />
      </div>

      <div>
        <textarea
          name="body"
          placeholder="Body"
          value={email.body}
          onChange={handleChange}
        />
      </div>

      <div>
        <p>Add attachment (optional)</p>
        <input type="file" multiple onChange={handleFileChange} />
      </div>
      <button type="submit">Add Email</button>
    </form>
  );
};

export default AddEmailForm;
