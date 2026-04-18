import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;
    if (!email || !password) {
      return setError("Please fill Login Details");
    }
    try {
      const request = await axios.post(
        "http://localhost:8000/api/auth/login",
        loginData
      );
      localStorage.setItem("token", request.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email : </label>
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
            placeholder="Enter your email..."
          />
        </div>
        <div>
          <label>Password : </label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            placeholder="Enter your Password..."
          />
        </div>
        <button type="submit">Login</button>
        <p>{error ? error : ""}</p>
      </form>
      <p>Don't have a account ? <Link to='/signup'>Create Account</Link></p>
    </div>
  );
};

export default Login;
