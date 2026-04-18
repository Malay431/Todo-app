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
        "http://localhost:8000/api/auth/login",
        signupData
      );
      localStorage.setItem("token", request.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignup}>
        <div>
          <label>Name : </label>
          <input
            type="text"
            name="name"
            value={signupData.name}
            onChange={(e) =>
              setLoginData({ ...signupData, name: e.target.value })
            }
            placeholder="Enter your Name..."
          />
        </div>
        <div>
          <label>Email : </label>
          <input
            type="email"
            name="email"
            value={signupData.email}
            onChange={(e) =>
              setLoginData({ ...signupData, email: e.target.value })
            }
            placeholder="Enter your email..."
          />
        </div>
        <div>
          <label>Password : </label>
          <input
            type="password"
            name="password"
            value={signupData.password}
            onChange={(e) =>
              setLoginData({ ...signupData, password: e.target.value })
            }
            placeholder="Enter your Password..."
          />
        </div>
        <button type="submit">Signup</button>
        <p>{error ? error : ""}</p>
      </form>
      <p>Already have an account ? <Link to='/login'>Login</Link></p>
    </div>
  );
};

export default Signup;
