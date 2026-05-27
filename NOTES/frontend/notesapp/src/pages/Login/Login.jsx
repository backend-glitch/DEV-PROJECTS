import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/Navbar/input/PasswordInput";
import { validateEmail } from "../../utils/helper";

const Login = () => {

    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);


    const handleLogin = async(e) => {
        e.preventDefault();

          if(!validateEmail(email)){
                setError("Enter a valide email");
                return;
            }
        
            if(!password){
                setError("enter a password");
                return;
            }
            
    }

    // if(!validateEmail) {
    //     setError("Please enter a valide email");
    //     return;
    // }

//     if(!password){
//     setError("please enter a password");
// };

//setError("");

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