import React, { useState } from "react";

function RegistrationForm() {
  // State for form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // State for errors
  const [errors, setErrors] = useState({});

  // Validation function
  const validate = () => {
    const newErrors = {};
    if (!fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!email.includes("@") || !email.includes(".")) {
      newErrors.email = "Invalid email format";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const userData = { fullName, email, password };
      console.log("Registration successful:", userData);

      // Save to localStorage
      localStorage.setItem("registeredUser", JSON.stringify(userData));

      // Clear form fields
      setFullName("");
      setEmail("");
      setPassword("");
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "20px auto", padding: "20px", backgroundColor: "#f5f5f5", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Registration Form</h2>

      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="fullName" style={{ fontWeight: "bold" }}>Full Name:</label>
        <input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={{ width: "100%", padding: "8px", borderRadius: "4px", border: errors.fullName ? "1px solid red" : "1px solid #ccc" }}
        />
        {errors.fullName && <p style={{ color: "red", marginTop: "5px" }}>{errors.fullName}</p>}
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="email" style={{ fontWeight: "bold" }}>Email Address:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "8px", borderRadius: "4px", border: errors.email ? "1px solid red" : "1px solid #ccc" }}
        />
        {errors.email && <p style={{ color: "red", marginTop: "5px" }}>{errors.email}</p>}
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="password" style={{ fontWeight: "bold" }}>Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "8px", borderRadius: "4px", border: errors.password ? "1px solid red" : "1px solid #ccc" }}
        />
        {errors.password && <p style={{ color: "red", marginTop: "5px" }}>{errors.password}</p>}
      </div>

      <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
        Register
      </button>
    </form>
  );
}

export default RegistrationForm;
