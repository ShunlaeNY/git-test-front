import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { useCRUD } from "../HOC/useCRUD";
import { useFetchData } from "../HOC/UseFetchData";

export default function Entry() {
  const [formData, setFormData] = useState({
    name: "",
    subjectId: "",
    startDate: "",
    endDate: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); // New state for error messages
  const [subjectList, setSubjectList] = useState([]);
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

  const { handleCreate, handleEdit, loading, error } = useCRUD();

  // Fetch student data if id is provided
  const { data: studentData } = useFetchData(
    id ? `http:localhost:1818/student/getbyId/${id}` : null
  );
  useEffect(() => {
    if (studentData) {
      setFormData(studentData);
    }
  }, [studentData]);

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
    console.log("Form Submitted:", formData);

    const url = id
      ? `http://localhost:1818/student/edit/${id}`
      : "http://localhost:1818/student/add";
    if (id) {
      handleEdit(url, id, formData).then(() => navigate("/student/list"));
    } else {
      handleCreate(url, formData).then(() => navigate("/student/list"));
    }
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {error.message}</div>;

  return (
    <div className="form-container">
      <h1>{id ? "Exam Data Update Form" : "Exam Data Registration Form"}</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}{" "}
      {/* Error message */}
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
