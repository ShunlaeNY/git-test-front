import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { useCRUD } from "../HOC/useCRUD";
import { useFetchData } from "../HOC/UseFetchData";

export default function Entry() {
  const [formData, setFormData] = useState({
    studentId: "",
    subjectId: "",
    marks: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const [studentList, setStudentList] = useState([]); // State for student list
  const [subjectList, setSubjectList] = useState([]); // State for subject list

  // Fetch student list
  useEffect(() => {
    axios
      .get("http://localhost:1818/student/list")
      .then((response) => {
        setStudentList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, []);

  // Fetch subject list
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

  // Fetch result data if id is provided
  const { data: resultData } = useFetchData(
    id ? `http://localhost:1818/result/getbyId/${id}` : null
  );

  useEffect(() => {
    if (resultData) {
      setFormData(resultData);
    }
  }, [resultData]);

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
    const url = id
      ? `http://localhost:1818/result/edit/${id}`
      : "http://localhost:1818/result/add";
    if (id) {
      handleEdit(url, id, formData).then(() => navigate("/result/list"));
    } else {
      handleCreate(url, formData).then(() => navigate("/result/list"));
    }
  };

  // Handle form clear/reset
  const handleClear = () => {
    setFormData({
      studentId: "",
      subjectId: "",
      marks: "",
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {error.message}</div>;

  return (
    <div className="form-container">
      <h1>
        {id ? "Result Data Update Form" : "Result Data Registration Form"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="studentId">Choose Student:</label>
          <select
            name="studentId"
            id="studentId"
            value={formData.studentId}
            onChange={handleChange}
            required
          >
            <option value="">Select Student</option>
            {studentList.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
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
          <label htmlFor="marks">Marks:</label>
          <input
            type="number"
            name="marks"
            value={formData.marks}
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
