import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useFetchData } from "../HOC/UseFetchData";
import { useCRUD } from "../HOC/useCRUD";
import Table from "../HOC/Table";

export default function List(params) {
  const {
    data: students,
    loading,
    error,
  } = useFetchData("http://localhost:1818/student/list");

  const { handleDelete, loading: crudLoading, error: crudError } = useCRUD();
  const navigate = useNavigate();

  const columns = [
    { field: "name", label: "Student Name" },
    { field: "email", label: "Email" },
    { field: "gender", label: "Gender" },
    { field: "phonenumber", label: "Phone Number" },
    { field: "address", label: "Address" },
  ];
  const handleEdit = (id) => {
    console.log("Edit student:", id);
    navigate(`/student/entry/${id}`);
  };
  const handleAddNew = () => {
    console.log("Add new student");
    navigate(`/student/entry`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="container">
      <div className="table-container">
        <h2>Student List</h2>
        <button onClick={handleAddNew} className="tag-btn">
          Add New Student
        </button>
        <Table
          columns={columns}
          data={students}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}
