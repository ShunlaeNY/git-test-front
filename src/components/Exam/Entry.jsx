import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function StudentReg() {
  const [formData, setFormData] = useState({
    name: "",
    subjectId: "",
    startDate: "",
    endDate: "",
  });
  const [subjectList, setSubjectList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // New state for error messages
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch data from the subject table
  useEffect(() => {
    axios
      .get("http://localhost:1818/subject/list")
      .then((response) => {
        setSubjectList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching subject data:", error);
      });
  }, []);

  // Fetch student data if ID is provided
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:1818/exam/getbyid/${id}`)
        .then((response) => {
          setFormData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching exam data:", error);
        });
    }
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate date input
    if (formData.startDate > formData.endDate) {
      setErrorMessage("End Date cannot be earlier than Start Date.");
      return;
    }

    setErrorMessage(""); // Clear any previous errors

    const url = id
      ? `http://localhost:1818/exam/edit/${id}`
      : "http://localhost:1818/exam/add";
    const method = id ? "put" : "post";
    axios[method](url, formData)
      .then((response) => {
        console.log("Student added/updated successfully:", response.data);
        navigate("/students");
      })
      .catch((error) => {
        console.error("Error adding/updating student:", error);
        setErrorMessage("An error occurred while submitting the form.");
      });
  };

  // Handle form clear/reset
  const handleClear = () => {
    setFormData({
      name: "",
      subjectId: "",
      startDate: "",
      endDate: "",
    });
    setErrorMessage(""); // Clear any error message
  };

  return (
    <div className="form-container">
      <h1>{id ? "Exam Data Update Form" : "Exam Data Registration Form"}</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} {/* Error message */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Exam Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="subjectId">Subject:</label>
          <select
            name="subjectId"
            id="subjectId"
            value={formData.subjectId}
            onChange={handleChange}
            required
          >
            <option value="">Select Subject</option>
            {subjectList.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="startDate">Exam Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate">Exam End Date:</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="btn-container">
          <button type="submit" className="btn">
            {id ? "Update" : "Register"}
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="btn delete-btn"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
