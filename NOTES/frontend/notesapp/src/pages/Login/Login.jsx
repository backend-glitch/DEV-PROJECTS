import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link,useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Navbar/input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import { FaAppStoreIos } from "react-icons/fa6";
import api from "../../api/axios.js";


const Login = () => {

    // hooks are always written inside componenet
    const navigate = useNavigate();

    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

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

        const response = await api.post("/auth/login", {
            email,
            password,
        });

        localStorage.setItem(
            "token",
            response.data.token
        );

        navigate("/dashboard"); 

        console.log(response.data);

    } catch (error) {

         console.log(error);
    console.log(error.response);

        setError(
            error.response?.data?.message ||
            "Login failed"
        );

    }
};

    return (
        <>
        <Navbar />

        <div className="flex items-center justify-center mt-28">
            <div className="w-96 border rounded bg-white px-7 py-10" >
              <form onSubmit={handleLogin}>
                <h4 className="text-2xl mb-7">Login</h4>

                
                <input type="text"
                 placeholder="Email"
                  className="input-box"
                  value={email} onChange={(e) => setemail(e.target.value)}
                  />
                <PasswordInput  value ={password} onChange={(e) => setPassword(e.target.value)}/>

                    {error && <p className="text-red-500 text-xs pb-1">{error}</p>}


                <button type="submit" className="btn-primary">
                    LOGIN
                </button>

                <p className="text-sm text-center mt-4">
                    Not registered yet?{" "}
                     <Link to="/SignUp" className="font-medium text-secondary underline">
                        Create a Account
                    </Link>

                </p>
                </form>    
            </div>
        </div>
        </>
       // <div>Login</div>
    )
}

export default Login;