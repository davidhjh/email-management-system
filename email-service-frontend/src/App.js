import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddEmailForm from "./components/AddEmailForm";
import FetchEmailById from "./components/FetchEmailById";
import DeleteEmailById from "./components/DeleteEmailById";
import UpdateEmailForm from "./components/UpdateEmailForm";
import HomePage from "./components/HomePage";
import "./App.css";

const App = () => {
  return (    
  <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-email" element={<AddEmailForm />} />
        <Route path="/fetch-email" element={<FetchEmailById />} />
        <Route path="/delete-email" element={<DeleteEmailById />} />
        <Route path="/update-email" element={<UpdateEmailForm />} />
      </Routes>
    </div>
  </Router>
  );
};

export default App;
