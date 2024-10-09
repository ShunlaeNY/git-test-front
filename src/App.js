import logo from "./logo.svg";
import "./App.css";
import StudentList from "./components/StudentList";
import StudentReg from "./components/StudentReg";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ExamList from "./components/Exam/List";
import ExamEntry from "./components/Exam/Entry";
import Home from "./components/Home";
import Hello from "./components/Hello";
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
        <a href="/students">StudentList</a>
        <a href="/register">Student Register</a>
        <a href="/exam/list">Exams</a>
      </div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/students" element={<StudentList />}></Route>
        <Route path="/register" element={<StudentReg />}></Route>
        <Route path="/register/:id" element={<StudentReg />}></Route>
        <Route path="/hello" element={<Hello />}></Route>
        <Route path="/exam/list" element={<ExamList />}></Route>
        <Route path="/exam/entry" element={<ExamEntry />}></Route>
        <Route path="/exam/entry/:id" element={<ExamEntry />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
