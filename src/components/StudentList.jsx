import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentList() {
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState("false");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:1818/student/list")
      .then((response) => setStudentList(response.data)) // Correctly use response.data
      .catch((error) => console.log(error)); // Handle error if needed
  }, [loading]);
  const handleEdit = (id) => {
    console.log("Edit clicked for student with id:", id);
    navigate(`/register/${id}`);
  };
  const handleDelete = async (id) => {
    console.log("DELETE", id);
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (!confirmDelete) return;
    setLoading(true);
    try {
      await axios.delete(`http://localhost:1818/student/delete/${id}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Student List</h2>
      {console.log(studentList)}
      <Table
        studentList={studentList}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

function Table({ studentList, handleEdit, handleDelete }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>No.</th>
          <th>Student Name</th>
          <th>Student Email</th>
          <th>Gender</th>
          <th>Phone Number</th>
          <th>Address</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {studentList.map((student, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.gender}</td>
            <td>{student.phonenumber}</td>
            <td>{student.address}</td>
            <td>
              <div className="btn-container">
                <button
                  className="icon-btn"
                  onClick={() => {
                    handleEdit(student.id);
                  }}
                >
                  <i class="fa-solid fa-user-pen"></i>
                </button>

                <button
                  className="icon-btn"
                  onClick={() => {
                    handleDelete(student.id);
                  }}
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
