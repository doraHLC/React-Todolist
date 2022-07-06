import logo from './logo.svg';
import './App.css';
import Todo from './components/PageTodo';
import Home from './components/PageHome';
import SignUp from './components/SignUp';
import { Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <nav>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/todo">todo</Link>
        </li>
        <li>
          <Link to="/signUp">signUp</Link>
        </li>
      </nav>
      <hr/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="todo" element={<Todo />} />
        <Route path="signUp" element={<SignUp />} />
      </Routes>

    </div>
  );
}

export default App;
