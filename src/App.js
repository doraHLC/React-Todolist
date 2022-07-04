import logo from './logo.svg';
import './App.css';
import Todo from './components/pageTodo';
import Home from './components/pageHome';
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
      </nav>
      <hr/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="todo" element={<Todo />} />
      </Routes>

    </div>
  );
}

export default App;
