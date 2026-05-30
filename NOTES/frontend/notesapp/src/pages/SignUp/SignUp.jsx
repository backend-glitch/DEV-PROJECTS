import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Navbar/input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import api from "../../api/axios.js";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    // VALIDATION
    if (!fullName) return setError("Enter a name");

    if (!validateEmail(email))
      return setError("Enter a valid email");

    if (!password)
      return setError("Enter a password");

    try {
      const res = await api.post("/auth/signUp", {
        fullName,
        email,
        password,
      });

      localStorage.clear();
//localStorage.setItem("token", res.data.token);

      // save token (only if backend sends it)
     // if (res.data.token) {
      //  localStorage.setItem("token", res.data.token);
     // }

      // redirect to login
      navigate("/login");

    } catch (error) {
      console.log(error);
      setError(
        error.response?.data?.message || "Signup failed"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">

          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">SignUp</h4>

            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <p className="text-red-500 text-xs pb-1">
                {error}
              </p>
            )}

            <button type="submit" className="btn-primary">
              Create Account
            </button>

            <p className="text-sm text-center mt-4">
              Already have an Account?{" "}
              <Link
                to="/login"
                className="font-medium text-secondary underline"
              >
                Login
              </Link>
            </p>
          </form>

        </div>
      </div>
    </>
  );
};

export default SignUp;