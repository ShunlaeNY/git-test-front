import { useState } from "react";
import axios from "axios";

export function useCRUD() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create new record
  const handleCreate = async (url, newData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(url, newData);
      console.log("Successfully created:", response.data);
      return response.data; // Return the created record if needed
    } catch (err) {
      console.error("Error creating:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Edit existing record
  const handleEdit = async (url, id, updatedData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${url}/${id}`, updatedData);
      console.log("Successfully edited:", response.data);
      return response.data; // Return the updated record if needed
    } catch (err) {
      console.error("Error editing:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete record
  const handleDelete = async (url, id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(`${url}/${id}`);
      console.log("Successfully deleted:", response.data);
    } catch (err) {
      console.error("Error deleting:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { handleCreate, handleEdit, handleDelete, loading, error };
}
