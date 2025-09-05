import React from "react";
import RegistrationForm from "./RegistrationForm";
import StudentManagement from "./StudentManagement";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Assignments</h1>

      <h2>Assignment 1: Registration Form</h2>
      <RegistrationForm />

      <hr />

      <h2>Assignment 2: Student Management</h2>
      <StudentManagement />
    </div>
  );
}

export default App;
