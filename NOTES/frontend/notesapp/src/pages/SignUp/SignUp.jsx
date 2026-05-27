import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Navbar/input/PasswordInput";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper";

const SignUp = () => {

const[name, setName] = useState("");
  const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSignUp = async(e) => {
        e.preventDefault();
    

    if(!name) {
        setError("enter a name");
        return;
    }

    if(!validateEmail(email)){
        setError("Enter a valide email");
        return;
    }

    if(!password){
        setError("enter a password");
        return;
    }
}

    return (
           <>
        <Navbar />

        <div className="flex items-center justify-center mt-28">
            <div className="w-96 border rounded bg-white px-7 py-10" >
              <form onSubmit={handleSignUp}>
                <h4 className="text-2xl mb-7">SignUp</h4>

                <input type="text"
                 placeholder="Name"
                  className="input-box"
                  value={name} onChange={(e) => setName(e.target.value)}
                  />
               
                   <input type="text"
                 placeholder="Email"
                  className="input-box"
                  value={email} onChange={(e) => setemail(e.target.value)}
                  />
               

                 <PasswordInput  value ={password} onChange={(e) => setPassword(e.target.value)}/>

                    {error && <p className="text-red-500 text-xs pb-1">{error}</p>}



                <button type="submit" className="btn-primary">
                    Create Account
                </button>


                <p className="text-sm text-center mt-4">
                    Already have an Account?{" "}
                     <Link to="/Login" className="font-medium text-secondary underline">
                        Login
                    </Link>

                </p>
                
                </form>    
            </div>
        </div>
        </>
    )
}

export default SignUp;