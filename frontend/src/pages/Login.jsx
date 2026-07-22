import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/users/login",
        {
          email,
          password,
        }
      );

      console.log(response.data);

      localStorage.setItem(
        "token",
        response.data.accessToken
      );

      if (response.data.user) {

        console.log(response.data);
        console.log(response.data.user);
        console.log(response.data.user.id);

        localStorage.setItem( 
            "userId",
            response.data.user.id
        );

        localStorage.setItem(
          "userName",
          response.data.user.name
        );

        localStorage.setItem(
          "userEmail",
          response.data.user.email
        );
      }

      alert("Login Successful");

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Login Failed");
    }
  };

  return (
    <div className="content">
      <div className="login-form-container">
        <h2 className="page-title">
          Login
        </h2>

        <form
          className="login-form-card"
          onSubmit={handleLogin}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <br />
          <br />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <br />
          <br />

          <button type="submit">
            Login
          </button>

          <div className="login-register-link">
            <p>Don't have an account?</p>
            <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
