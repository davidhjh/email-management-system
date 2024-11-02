import React from "react";
import { Link } from "react-router-dom";
import "./../styles/HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Email Management Service</h1>
      <p>Welcome! This application lets you add, fetch, update, and delete emails recorded in the database.</p>

      <div className="feature-links">
        <div className="feature-item">
          <h2>Add Email</h2>
          <p>Add new emails to the database with optional attachments.</p>
          <Link to="/add-email" className="feature-link">Go to Add Email</Link>
        </div>

        <div className="feature-item">
          <h2>Fetch Email</h2>
          <p>Fetch and view stored email with their details by the given ID.</p>
          <Link to="/fetch-email" className="feature-link">Go to Fetch Email</Link>
        </div>

        <div className="feature-item">
          <h2>Update Email</h2>
          <p>Update the details of an existing email by the given ID.</p>
          <Link to="/update-email" className="feature-link">Go to Update Email</Link>
        </div>

        <div className="feature-item">
          <h2>Delete Email</h2>
          <p>Delete an email from the database by the given ID.</p>
          <Link to="/delete-email" className="feature-link">Go to Delete Email</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
