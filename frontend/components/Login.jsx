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
    <div className="flex flex-col w-full min-h-screen items-center justify-center">
      <form
        className="border border-gray-100 shadow-2xl rounded-2xl p-7 md:p-10 md:w-1/4"
        onSubmit={handleLogin}
      >
        <h1 className="text-2xl font-semibold">Login</h1>
        <div className="flex flex-col my-7 w-full">
          <input
            className="border border-gray-500 px-3 py-2 rounded-lg w-full"
            type="email"
            name="email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
            placeholder="Email"
          />
        </div>

        <div className="flex flex-col w-full">
          <input
            className="border border-gray-500 px-3 py-2 rounded-lg w-full"
            type="password"
            name="password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            placeholder="Password"
          />
        </div>
        <p className="text-red-500 my-1">{error ? error : ""}</p>
        <button type="submit" className="w-full font-semibold bg-blue-600 text-white my-3 rounded py-1 cursor-pointer hover:bg-blue-800">
          Login
        </button>
        <p className="text-center">
          Don't have a account? <Link to="/signup" className="text-blue-700 underline underline-offset-4">Create Account</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
