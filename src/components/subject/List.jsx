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
    data: subjects,
    loading,
    error,
  } = useFetchData("http://localhost:1818/subject/list", deleteStatus);
  const navigate = useNavigate();

  const columns = [{ field: "name", label: "Subject Name" }];
  const handleEdit = (id) => {
    console.log("Edit subject:", id);
    navigate(`/subject/entry/${id}`);
  };
  const handleAddNew = () => {
    console.log("Add new subject");
    navigate(`/subject/entry`);
  };

  const handleDeleteSubject = async (id) => {
    const url = `http://localhost:1818/subject/delete`;
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
        <h2>Subject List</h2>
        <button onClick={handleAddNew} className="tag-btn">
          Add New Subject
        </button>
        <Table
          columns={columns}
          data={subjects}
          handleEdit={handleEdit}
          handleDelete={handleDeleteSubject}
        />
      </div>
    </div>
  );
}
