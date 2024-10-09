import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useFetchData } from "../HOC/UseFetchData";
import { useCRUD } from "../HOC/useCRUD";
import Table from "../HOC/Table";

export default function List(params) {
  const {
    handleDelete,
    loading: crudLoading,
    error: crudError,
    deleteStatus,
  } = useCRUD();

  const {
    data: results,
    loading,
    error,
  } = useFetchData("http://localhost:1818/result/list", deleteStatus);

  const navigate = useNavigate();

  const columns = [
    { field: "studentId", label: "Student Name" },
    { field: "subjectId", label: "Subject Name" },
    { field: "marks", label: "Marks" },
  ];
  const handleEdit = (id) => {
    console.log("Edit exam:", id);
    navigate(`/result/entry/${id}`);
  };
  const handleAddNew = () => {
    console.log("Add new exam");
    navigate(`/result/entry`);
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
        <h2>Exam List</h2>
        <button onClick={handleAddNew} className="tag-btn">
          Add New Result
        </button>
        <Table
          columns={columns}
          data={results}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}
