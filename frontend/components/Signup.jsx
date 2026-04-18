import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupData;
    if (!name || !email || !password) {
      return setError("Please fill Login Details");
    }
    try {
      const request = await axios.post(
        "http://localhost:8000/api/auth/signup",
        signupData
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
        onSubmit={handleSignup}
        className="border border-gray-100 shadow-2xl rounded-2xl p-7 md:p-10 md:w-1/4"
      >
        <h1 className="text-2xl font-semibold">Create Account</h1>
        <p className="text-gray-500">Fill your details to create new account</p>
        <div className="flex flex-col my-7 w-full">
          <input
            className="border border-gray-500 px-3 py-2 rounded-lg w-full"
            type="text"
            name="name"
            value={signupData.name}
            onChange={(e) =>
              setSignupData({ ...signupData, name: e.target.value })
            }
            placeholder="Name"
          />
        </div>
        <div className="flex flex-col my-7 w-full">
          <input
            className="border border-gray-500 px-3 py-2 rounded-lg w-full"
            type="email"
            name="email"
            value={signupData.email}
            onChange={(e) =>
              setSignupData({ ...signupData, email: e.target.value })
            }
            placeholder="Email"
          />
        </div>
        <div className="flex flex-col w-full">
          <input
            className="border border-gray-500 px-3 py-2 rounded-lg w-full"
            type="password"
            name="password"
            value={signupData.password}
            onChange={(e) =>
              setSignupData({ ...signupData, password: e.target.value })
            }
            placeholder="Password"
          />
        </div>
        <p className="text-red-500 my-1">{error ? error : ""}</p>
        <button
          type="submit"
          className="w-full font-semibold bg-blue-600 text-white my-3 rounded py-1 cursor-pointer hover:bg-blue-800"
        >
          Signup
        </button>
        <p className="text-center">
          Already have an account? <Link to="/login" className="text-blue-700 underline underline-offset-4">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
