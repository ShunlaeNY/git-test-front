import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentList() {
  const [studentList, setStudentList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:1818/student/list")
      .then((response) => setStudentList(response.data)) // Correctly use response.data
      .catch((error) => console.log(error)); // Handle error if needed
  }, []);
  const handleEdit = (id) => {
    console.log("Edit clicked for student with id:", id);
    navigate(`/register/${id}`);
  };

  return (
    <div className="form-container">
      <h2>Student List</h2>
      {console.log(studentList)}
      <Table studentList={studentList} handleEdit={handleEdit} />
    </div>
  );
}

function Table({ studentList, handleEdit }) {
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
                <button className="icon-btn">
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
