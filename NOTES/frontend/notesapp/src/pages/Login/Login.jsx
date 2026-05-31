import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link,useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Navbar/input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import { FaAppStoreIos } from "react-icons/fa6";
import api from "../../api/axios.js";

import lottieReact from "lottie-react";
import loginAnimation from "../../assets/login.json";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa6";

import GithubIcon from "../../components/icons/GithubIcon.jsx";
import FullScreenLoader from "../../components/Loader/FullScreenLoader.jsx";

//console.log(Lottie)
//console.log(loginAnimation);

const Lottie = lottieReact.default;

const Login = () => {

    // hooks are always written inside componenet
    const navigate = useNavigate();

    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const [loading,setLoading] = useState(false);

const handleLogin = async (e) => {

    e.preventDefault();

    if (!validateEmail(email)) {
        setError("Enter a valid email");
        return;
    }

    if (!password) {
        setError("Enter a password");
        return;
    }



    setError("");

    try {

      setLoading(true);

        const res = await api.post("/auth/login", {
            email,
            password,
        });

        localStorage.setItem(
            "token",
            res.data.token
        );

        localStorage.setItem("token", res.data.token);
     localStorage.setItem("user", JSON.stringify(res.data.user));

        navigate("/dashboard"); 
        toast.success("Login Successfull");
 


        console.log(res.data);

    } catch (error) {

         console.log(error);
    console.log(error.response);

        setError(
            error.response?.data?.message ||
            "Login failed"
        );

    }finally{
      setLoading(false);
    }
};

   return (
  <>
    <Navbar />

    <div className="min-h-[80vh] flex flex-col lg:flex-row items-center justify-center gap-12 px-6">

      {/* Lottie Animation */}
      <div className="w-full max-w-md">
        <Lottie
          animationData={loginAnimation}
          loop={true}
        />
      </div>

      {/* Login Form */}
      <div className="w-96 border rounded bg-white px-7 py-10 shadow-md">
        <form onSubmit={handleLogin}>
          <h4 className="text-2xl mb-7">Login</h4>

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
             {loading ? <FullScreenLoader /> : "LOGIN"}
          </button>
  

          <p className="text-sm text-center mt-4">
            Not registered yet?{" "}
            <Link
              to="/signup"
              className="font-medium text-secondary underline"
            >
              Create an Account
            </Link>
          </p>
        </form>
      </div>

 <GithubIcon />

    </div>

    
  </>
);
}

export default Login;