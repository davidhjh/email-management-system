import axios from 'axios';
import React, { useState } from 'react';

const DeleteEmail = () => {
  const [emailId, setEmailId] = useState('');

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/emails/${emailId}`);
      console.log(response.data);
      alert('Email deleted successfully!');
    } catch (error) {
      console.error("There was an error deleting the email!", error);
      alert('Failed to delete email.');
    }
  };

  return (
    <div>
      <h2>Delete Email</h2>
      <input
        type="text"
        value={emailId}
        onChange={(e) => setEmailId(e.target.value)}
        placeholder="Enter email ID"
      />
      <button onClick={handleDelete}>Delete Email</button>
    </div>
  );
};

export default DeleteEmail;
