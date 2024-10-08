import React from "react";
const studentList = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    gender: "Male",
    phone: "1234567890",
    address: "123 Main St, City, State, Zip",
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    gender: "Female",
    phone: "0987654321",
    address: "456 Elm St, City, State, Zip",
  },
  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    gender: "Female",
    phone: "9876543210",
    address: "789 Oak St, City, State, Zip",
  },
];
export default function StudentList() {
  return (
    <div>
      <h2>Student List</h2>
      <Table studentList={studentList} />
    </div>
  );
}
function Table({ studentList }) {
  return (
    // console.log(studentList);
    <table border={1}>
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
            <td>{student.phone}</td>
            <td>{student.address}</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot></tfoot>
    </table>
  );
}
