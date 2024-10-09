import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { useCRUD } from "../HOC/useCRUD";
import { useFetchData } from "../HOC/UseFetchData";

export default function Entry() {
  const [formData, setFormData] = useState({
    name: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const { handleCreate, handleEdit, loading, error } = useCRUD();

  // Fetch student data if id is provided
  const { data: subjectData } = useFetchData(
    id ? `http:localhost:1818/subject/getbyId/${id}` : null
  );
  useEffect(() => {
    if (subjectData) {
      setFormData(subjectData);
    }
  }, [subjectData]);

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
    console.log("Form Submitted:", formData);
    // Add your form submission logic here, like sending data to an API
    const url = id
      ? `http://localhost:1818/subject/edit/${id}`
      : "http://localhost:1818/subject/add";
    if (id) {
      handleEdit(url, id, formData).then(() => navigate("/subject/list"));
    } else {
      handleCreate(url, formData).then(() => navigate("/subject/list"));
    }
  };

  // Handle form clear/reset
  const handleClear = () => {
    setFormData({
      name: "",
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {error.message}</div>;

  return (
    <div className="form-container">
      <h1>{id ? "Subject Update Form" : "Subject Registration Form"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
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
