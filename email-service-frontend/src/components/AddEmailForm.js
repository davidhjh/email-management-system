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

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/emails/", email) 
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
      <button type="submit">Add Email</button>
    </form>
  );
};

export default AddEmailForm;
