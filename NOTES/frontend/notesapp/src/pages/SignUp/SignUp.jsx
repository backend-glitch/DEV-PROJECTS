import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Navbar/input/PasswordInput";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import api from "../../api/axios.js";
import toast from "react-hot-toast";


import lottieReact from "lottie-react";
import loginAnimation from "../../assets/signup.json";
import GithubIcon from "../../components/icons/GithubIcon.jsx";
import FullScreenLoader from "../../components/Loader/FullScreenLoader.jsx";



const Lottie = lottieReact.default;

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const [loading,setLoading] = useState(false);

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

      setLoading(true);

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
      toast.success("Account Created");

      // <GithubIcon />


    } catch (error) {
      console.log(error);
      setError(
        error.response?.data?.message || "Signup failed"
      );
    }finally{
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

 <div className="min-h-[80vh] flex flex-col lg:flex-row items-center justify-center gap-12 px-6">

 
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

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? <FullScreenLoader /> : "Create Account"}
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

        <div className="w-full max-w-md">
          <Lottie
            animationData={loginAnimation}
            loop={true}
          />
        </div>


      </div>
    </>
  );
};

export default SignUp;