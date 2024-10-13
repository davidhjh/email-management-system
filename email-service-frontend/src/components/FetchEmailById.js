import React, { useState } from "react";
import axios from "axios";

const FetchEmailById = () => {
  const [emailId, setEmailId] = useState("");
  const [email, setEmail] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`/api/emails/${emailId}`)
      .then((response) => {
        setEmail(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the email!", error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Email ID"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />
        <button type="submit">Fetch Email</button>
      </form>

      {email && (
        <div>
          <p>Sender: {email.sender}</p>
          <p>Recipient: {email.recipient}</p>
          <p>Subject: {email.subject}</p>
          <p>Body: {email.body}</p>
          <p>Attachments: {email.attachmentIds.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default FetchEmailById;
