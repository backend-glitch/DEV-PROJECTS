import { useState } from "react";
import API from "../connection/axios.js";
import toast from "react-hot-toast";
import lottieReact from "lottie-react"
import signupAnimation from "./../assets/signup.json";
import { Link ,useNavigate} from "react-router-dom";
import FullScreenLoader from "./loading/Loading.jsx";

const Lottie = lottieReact.default;


function Signup() {

  const navigate = useNavigate();

    const [name,setName] =  useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error ,setError] = useState({
  name : "",
  email : "",
  password : "",
  })

  const [loading, setLoading] = useState(false);



  const handleSignup = async(e) => {

       e.preventDefault();
    
       const theerrors = {};

            if (!name) {
              theerrors.name = "Enter a valid name";
            toast.error("Enter a valid name");
         
        }

        if (!email) {
          theerrors.email = "Enter a valid email";
           toast.error("Enter a valid email");
          
        }
    
        if (!password) {
          theerrors.password =  "Enter a valid password";
            toast.error("Enter a valid password");
           
        }

        if(Object.keys(theerrors).length > 0) 
        {
          setError(theerrors);
          return;
        }

    setError("");

    
    try {


      setLoading(true);

      const res = await API.post("/auth/signup", { name,email,password });

      localStorage.setItem("token", res.data.token);

      toast.success("Successfully Signin");

      navigate("/login");
      // window.location.reload();
    } catch (err) {
      toast.error(" Signin Failed");
    } finally{
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-green-500 gap-20 ">
        
      
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-80">
        
        <h2 className="text-2xl font-bold text-center mb-2">
         Signup <span className="text-green-500"> TRACKHOBI</span>
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Signup for new account
        </p>

            {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
            <input
          type="text"
          placeholder="Name"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) => {setName(e.target.value) ,setError("")}}
        />


            {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
          
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) => {setEmail(e.target.value) ,setError("")}}
        />


            {error.password && <p className="text-red-500 text-sm">{error.password}</p>}
          
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) => {setPassword(e.target.value) ,setError("")}}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200"
        >
          { loading ? <FullScreenLoader/> : "SIGNUP" }
        </button>

             <p className="text-sm text-center mt-4">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="font-medium text-secondary underline"
                    >
                      Login Here
                    </Link>
                  </p>

      </div>

        
         <div className="w-full max-w-md">
                <Lottie
                  animationData={signupAnimation}
                  loop={true}
                />
              </div>
      
      
    </div>

  );
}

export default Signup;