export default function ResultEntry() {
  return (
    <div className="form-container">
      <h1>Result Registration Form</h1>
      <form>
        <div>
          <select name="StudentID" id="StudentID">
            <option value="">Choose StudentID</option>
            <option value="">Student One</option>
            <option value="">Student Two</option>
            <option value="">Student Three</option>
            <option value="">Student Four</option>
          </select>
        </div>

        <div>
          <select name="SubjectID" id="SubjectID">
            <option value="">Choose SubjectID</option>
            <option value="Subject One">Subject One</option>
            <option value="Subject Two">Subject Two</option>
            <option value="Subject Three">Subject Three</option>
            <option value="Subject Four">Subject Four</option>
          </select>
        </div>
        <div>
          <label htmlFor="name">Result:</label>
          <input type="text" name="name" required placeholder="xmarks" />
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
