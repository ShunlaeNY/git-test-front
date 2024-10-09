function Table({ data, columns, handleEdit, handleDelete }) {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.field}>{col.label}</th>
          ))}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {columns.map((col) => (
              <td key={col.field}>{item[col.field]}</td>
            ))}
            <td>
              <div className="btn-container">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="icon-btn"
                >
                  <div className="icon-wrap">
                    <i className="fa-solid fa-user-pen"></i>
                  </div>
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="icon-btn"
                >
                  <div className="icon-wrap">
                    <i className="fa-solid fa-trash"></i>
                  </div>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default Table;
