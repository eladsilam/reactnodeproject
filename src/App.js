import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Homepage from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import logo from "./assets/logo/trash_manage.jpg";
function App() {
  const authors = "Elad Silam 208112185\n Shai Salem 314784372";
  return (
    <div>
      <h1>
        <img src={logo} alt="Logo" height="35" width="auto" />
        Elad Silam && Shai Salem Trash Management{" "}
        <img src={logo} alt="Logo" height="35" width="auto" />
      </h1>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Homepage</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
      </Router>
      <footer>
        © 2025 All Rights Reserved
        <br />
        {authors}
      </footer>
    </div>
  );
}

export default App;
