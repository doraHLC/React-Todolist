import './App.css';
import { useState, createContext } from 'react';
import Todo from './components/PageTodo';
import Home from './components/PageHome';
import SignUp from './components/SignUp';
import { Routes, Route, Link } from "react-router-dom";
import { AuthContext } from "./components/Context";
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  const [token, setToken] = useState(null);

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
      <AuthContext.Provider value={{ token, setToken }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="todo" element={
            <ProtectedRoute>
              <Todo />
            </ProtectedRoute>
          } />
          <Route path="signUp" element={<SignUp />} />
        </Routes>
      </AuthContext.Provider>

    </div>
  );
}

export default App;
