import { useState } from "react";
import API from "../connection/axios.js";
import toast from "react-hot-toast";
import lottieReact from "lottie-react"
import loginAnimation from "./../assets/login.json";
import { Link ,useNavigate} from "react-router-dom";

const Lottie = lottieReact.default;


function Login() {

const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailerror, setEmailerror] = useState("");
  const[passworderror,setPassworderror] = useState("");

  const clearError = () => {
    setEmailerror("");
    setPassworderror("");  
  }

 const handleKey = (e)  => {
    if(e.key === "enter") handleLogin(e)
    };


  const handleLogin = async (e) => {

       e.preventDefault();
    
        if (!email) {

           setEmailerror("Enter a valid email");
            return;
        }
    
        if (!password) {
            setPassworderror("Enter a valid Password");
            return;
        }

        clearError();
    
    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);

      localStorage.setItem("user", JSON.stringify({
        name : res.data.user.name,
        email : res.data.user.email
      }));

      toast.success("Successfully Logined");

   

      navigate("/dashboard");

     // console.log(res.data);
    
     // window.location.reload();
    } catch (err) {
      toast.error(" Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-500 gap-20 ">
        
        
         <div className="w-full max-w-md">
                <Lottie
                  animationData={loginAnimation}
                  loop={true}
                />
              </div>
      
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-80">
        
        <h2 className="text-2xl font-bold text-center mb-2">
         Login <span className="text-green-500"> TRACKHOBI</span>
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Login to your account
        </p>

 {emailerror && <p className=" text-sm text-red-500">{emailerror}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) => {setEmail(e.target.value);
                            setEmailerror("");
          }}
        />

       
   {passworderror && <p className=" text-sm text-red-500">{passworderror}</p>}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) => {setPassword(e.target.value);
                             setPassworderror("");
          }}
        />



        <button
        onKeyDown={handleKey}
          onClick={handleLogin}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200"
        >
          Login
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

      </div>
    </div>

  );
}

export default Login;