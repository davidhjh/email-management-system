import React, { useState } from "react";
import axios from "axios";
import "./../styles/EmailForm.css";

const DeleteEmailById = () => {
  const [emailId, setEmailId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.delete(`http://localhost:8080/api/emails/${emailId}`)
      .then(() => {
        alert("Email deleted successfully!");
      })
      .catch((error) => {
        console.error("There was an error deleting the email!", error);
      });
  };

  return (
    <form className="email-form" onSubmit={handleSubmit}>
      <h2>Delete email by given ID</h2>
      <div>
        <input
          type="text"
          placeholder="Enter Email ID to delete"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />
      </div>

      <button type="submit">Delete Email</button>
    </form>
  );
};

export default DeleteEmailById;