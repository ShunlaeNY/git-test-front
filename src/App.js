import logo from "./logo.svg";
import "./App.css";
import StudentList from "./components/StudentList";
import StudentReg from "./components/StudentReg";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Home from "./components/Home";
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
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/students">Students</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/students" element={<StudentList />}></Route>
        <Route path="/register" element={<StudentReg />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
