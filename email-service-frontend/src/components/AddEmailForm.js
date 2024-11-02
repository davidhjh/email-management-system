import React, { useState } from "react";
import axios from "axios";
import "./../styles/EmailForm.css";

const AddEmailForm = () => {
  const [email, setEmail] = useState({
    sender: "",
    recipient: "",
    subject: "",
    body: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    
    // Sender validation
    if (!email.sender) {
      errors.sender = "Sender email is required";
    } else if (!/\S+@\S+\.\S+/.test(email.sender)) {
      errors.sender = "Invalid email format";
    }

    // Recipient validation
    if (!email.recipient) {
      errors.recipient = "Recipient email is required";
    } else if (!/\S+@\S+\.\S+/.test(email.recipient)) {
      errors.recipient = "Invalid email format";
    }

    // Subject validation
    // if (!email.subject) {
    //   errors.subject = "Subject is required";
    // }

    // Body validation, random upper limit
    if (email.body.length > 20000) {
      errors.body = "Body cannot exceed 20000 characters";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
  };

  const [attachments, setAttachments] = useState(null);

  const handleFileChange = (e) => {
    setAttachments(e.target.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

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
    <form className="email-form" onSubmit={handleSubmit}>
      <h2>Add email</h2>

      <div>
        <input
          type="text"
          name="sender"
          placeholder="Sender"
          value={email.sender}
          onChange={handleChange}
        />
        {errors.sender && <p style={{ color: "red" }}>{errors.sender}</p>}
      </div>

      <div>
        <input
          type="text"
          name="recipient"
          placeholder="Recipient"
          value={email.recipient}
          onChange={handleChange}
        />
        {errors.recipient && <p style={{ color: "red" }}>{errors.recipient}</p>}
      </div>

      <div>
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={email.subject}
          onChange={handleChange}
        />
        {errors.subject && <p style={{ color: "red" }}>{errors.subject}</p>}
      </div>

      <div>
        <textarea
          name="body"
          placeholder="Body"
          value={email.body}
          onChange={handleChange}
        />
        {errors.body && <p style={{ color: "red" }}>{errors.body}</p>}
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
