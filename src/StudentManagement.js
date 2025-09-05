import React, { useState, useEffect } from "react";

function StudentManagement() {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("students");
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    course: "",
  });

  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent negative age
    if (name === "age" && value < 0) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.age || !formData.course) {
      alert("All fields are required!");
      return;
    }

    if (formData.age <= 0) {
      alert("Age must be greater than 0!");
      return;
    }

    if (editIndex !== null) {
      const updatedStudents = [...students];
      updatedStudents[editIndex] = formData;
      setStudents(updatedStudents);
      setEditIndex(null);
    } else {
      setStudents([...students, formData]);
    }

    setFormData({ name: "", email: "", age: "", course: "" });
  };

  const handleDelete = (index) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setFormData(students[index]);
    setEditIndex(index);
  };

  // Styling
  const styles = {
    container: {
      maxWidth: "800px",
      margin: "30px auto",
      padding: "25px",
      background: "linear-gradient(135deg, #f9f9f9, #e3f2fd)",
      borderRadius: "12px",
      boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
      fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    },
    heading: {
      textAlign: "center",
      color: "#333",
      marginBottom: "20px",
      fontSize: "24px",
      fontWeight: "bold",
    },
    form: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "15px",
      marginBottom: "20px",
    },
    input: {
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "14px",
      transition: "border 0.3s",
    },
    button: {
      gridColumn: "1 / span 2",
      padding: "12px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background 0.3s ease, transform 0.2s ease",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    },
    th: {
      background: "#007bff",
      color: "white",
      padding: "12px",
      textAlign: "left",
      fontSize: "15px",
    },
    td: {
      padding: "12px",
      borderBottom: "1px solid #ddd",
    },
    actionBtn: {
      padding: "6px 10px",
      marginRight: "8px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
    },
    editBtn: {
      backgroundColor: "#28a745",
      color: "white",
    },
    deleteBtn: {
      backgroundColor: "#dc3545",
      color: "white",
    },
    emptyRow: {
      textAlign: "center",
      padding: "15px",
      fontStyle: "italic",
      color: "#555",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Student Management</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          style={styles.input}
          min="1"
        />
        <input
          type="text"
          name="course"
          placeholder="Course"
          value={formData.course}
          onChange={handleChange}
          style={styles.input}
        />
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          {editIndex !== null ? "Update Student" : "Add Student"}
        </button>
      </form>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Age</th>
            <th style={styles.th}>Course</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="5" style={styles.emptyRow}>
                No students added
              </td>
            </tr>
          ) : (
            students.map((student, index) => (
              <tr key={index}>
                <td style={styles.td}>{student.name}</td>
                <td style={styles.td}>{student.email}</td>
                <td style={styles.td}>{student.age}</td>
                <td style={styles.td}>{student.course}</td>
                <td style={styles.td}>
                  <button
                    onClick={() => handleEdit(index)}
                    style={{ ...styles.actionBtn, ...styles.editBtn }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    style={{ ...styles.actionBtn, ...styles.deleteBtn }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentManagement;
