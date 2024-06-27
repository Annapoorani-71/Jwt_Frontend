// LoginCom.js
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function LoginCom() {
  const flipDiv = useRef(null);
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/dashboard', { withCredentials: true })
      .then(response => {
        const role = response.data.role;
        if (role.includes('reader')) {
          navigate('/reader-dashboard');
        } else if (role.includes('creator')) {
          navigate('/creator-dashboard');
        } else if (role.includes('admin')) {
          navigate('/admin-dashboard');
        }
      })
      .catch(error => {
        console.error('No active session found:', error);
      });
  }, [navigate]);

  const toRegister = () => {
    flipDiv.current.className = "flipper flip-action";
  };

  const toLogin = () => {
    flipDiv.current.className = "flipper";
  };

  return (
    <div className="flip-container">
      <div className="flipper" ref={flipDiv}>
        <div className="flippable">
          <Login setLoginError={setLoginError} toRegister={toRegister} />
        </div>
        <div className="register flippable">
          <Register setRegisterError={setRegisterError} toLogin={toLogin} />
        </div>
      </div>
      {loginError && <p className="error">{loginError}</p>}
      {registerError && <p className="error">{registerError}</p>}
    </div>
  );
}

const Login = ({ setLoginError, toRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      }, { withCredentials: true });

      if (response.status !== 200) {
        throw new Error(response.data.message || "Something went wrong");
      }

      const result = response.data;
      const { user } = result;


      if (user.roles.includes('reader')) {
        navigate('/reader-dashboard');
      } else if (user.roles.includes('creator')) {
        navigate('/creator-dashboard');
      } else if (user.roles.includes('admin')) {
        navigate('/admin-dashboard'); 
      } else {
        throw new Error("Unknown user role");
      }

    } catch (error) {
      console.error("Login error:", error);
      setLoginError(error.message);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Welcome back</h2>
      <p className="title">Enter details to login..</p>
      <div className="input-container">
        <input
          placeholder="Enter email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-container">
        <input
          placeholder="Enter password..."
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account?{" "}
        <strong onClick={toRegister}>Register</strong>
      </p>
    </div>
  );
};

const Register = ({ setRegisterError, toLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("reader"); // Default role is 'reader'

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:5000/signup", {
        username,
        email,
        password,
        roles: [role], // Include roles as an array in the registration data
      });

      if (response.status !== 201) {
        throw new Error(response.data.message || "Something went wrong");
      }

      const result = response.data;
      alert("Registration successful: " + JSON.stringify(result));
      toLogin(); // Flip back to the login form after successful registration
    } catch (error) {
      console.error("Registration error:", error);
      setRegisterError(error.message);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Create account</h2>
      <div className="input-container">
        <input
          placeholder="Enter username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="input-container">
        <input
          placeholder="Enter email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-container">
        <input
          placeholder="Enter password..."
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="input-container">
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="reader">Reader</option>
          <option value="creator">Creator</option>
        </select>
      </div>
      <button onClick={handleRegister}>Register</button>
      <p>
        Already have an account?{" "}
        <strong onClick={toLogin}>Login</strong>
      </p>
    </div>
  );
};
