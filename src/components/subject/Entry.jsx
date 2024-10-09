export default function SubjectEnty() {
  return (
    <div className="form-container">
      <h1>Subject Registration Form</h1>
      <form>
        <div>
          <label htmlFor="name">Subject Name:</label>
          <input type="text" name="name" required />
        </div>

        <div className="btn-container">
          <button type="submit" className="btn">
            Register
          </button>
          <button type="button" className="btn delete-btn">
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
