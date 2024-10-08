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
    data: exams,
    loading,
    error,
  } = useFetchData("http://localhost:1818/exam/list", deleteStatus);
  const navigate = useNavigate();

  const columns = [
    { field: "name", label: "Exam Name" },
    { field: "subject", label: "Subject" },
    { field: "startDate", label: "Start Date" },
    { field: "endDate", label: "End Date" },
  ];
  const handleEdit = (id) => {
    console.log("Edit exam:", id);
    navigate(`/exam/entry/${id}`);
  };
  const handleAddNew = () => {
    console.log("Add new exam");
    navigate(`/exam/entry`);
  };

  const handleDeleteExam = async (id) => {
    const url = `http://localhost:1818/exam/delete`;
    await handleDelete(url, id); // Trigger the delete action
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
          Add New Exam
        </button>
        <Table
          columns={columns}
          data={exams}
          handleEdit={handleEdit}
          handleDelete={handleDeleteExam}
        />
      </div>
    </div>
  );
}
