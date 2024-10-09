import logo from "./logo.svg";
import "./App.css";
import StudentList from "./components/Student/List";
import StudentEntry from "./components/Student/Entry";
// import Login from "./components/auth/Login";
// import Register from "./components/auth/Register";
import ExamList from "./components/Exam/List";
import ExamEntry from "./components/Exam/Entry";
import Home from "./components/Home";

import SubjectList from "./components/Subject/List";
import SubjectEntry from "./components/Subject/Entry";
import ResultList from "./components/Result/List";
import ResultEntry from "./components/Result/Entry";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="link-container">
        <a href="/">Home</a>
        <a href="/student/list">Students</a>
        <a href="/exam/list">Exams</a>
        <a href="/subject/list">Subjects</a>
        <a href="/result/list">Results</a>
      </div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        {/* Student */}
        <Route path="/student/list" element={<StudentList />}></Route>
        <Route path="/student/entry" element={<StudentEntry />}></Route>
        <Route path="/student/entry/:id" element={<StudentEntry />}></Route>

        {/* Subject */}
        <Route path="/subject/list" element={<SubjectList />}></Route>
        <Route path="/subject/entry" element={<SubjectEntry />}></Route>
        <Route path="/subject/entry/:id" element={<SubjectEntry />}></Route>

        {/* Result  */}
        <Route path="/result/list" element={<ResultList />}></Route>
        <Route path="/result/entry" element={<ResultEntry />}></Route>
        <Route path="/result/entry/:id" element={<ResultEntry />}></Route>

        {/* Exam */}
        <Route path="/exam/list" element={<ExamList />}></Route>
        <Route path="/exam/entry" element={<ExamEntry />}></Route>
        <Route path="/exam/entry/:id" element={<ExamEntry />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
