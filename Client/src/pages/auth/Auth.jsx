import { useState , useEffect } from "react";
import axios from "axios";
import heroImage from "../../assets/images/hero.jpg";
import logo from "../../assets/images/logo.png";
import Input from "../../components/Input";
import { useNavigate } from "react-router";
import { ClipLoader } from "react-spinners";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Auth = () => {
  const [Email, setEmail] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [Variant, setVariant] = useState("login");

  const navigate = useNavigate();

  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    console.log(params)
    const token = params.get('token');

    if (token) {
      console.log(token);
      localStorage.setItem('jwtToken', token);
      navigate('/profile');
    }
  },[ navigate]);

  const toggleVariant = () => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  };
  
  const register = async (username, email, password) => {
    const dataToSend = {
      username: username,
      email: email,
      password: password,
    };
  
    setLoading(true);
    try {
      let validationErrors = {};
      
      if (!username) {
        validationErrors.username = "Please enter a username.";
      }
      if(username.length < 3){
        validationErrors.username = "username must contain more than 2 character"
      }
      if (!email) {
        validationErrors.email = "Please enter a valid email address.";
      }
      if (!password) {
        validationErrors.password = "Your password must contain between 4 and 60 characters.";
      }
  
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length === 0) {
        const response = await axios.post(`https://netflix-watch-web.vercel.app/api/v1/register`, dataToSend);
        if (response) {
          console.log(response.data);
          setVariant("login");
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const login = async (email, password) => {
    const dataToSend = {
      email: email,
      password: password,
    };

    setLoading(true);
    try {
      let validationErrors = {};
      if (!email) {
        validationErrors.email = "Please enter a valid email address.";
      }
      if (!password) {
        validationErrors.password =
          "Your password must contain between 4 and 60 characters.";
      }

      setErrors(validationErrors);
      if (Object.keys(validationErrors).length === 0) {
        const response = await axios.post(
        `https://netflix-watch-web.vercel.app/api/v1/login`,
          dataToSend
        );
        if (response) {
          localStorage.setItem("jwtToken", response.data.token);
          navigate("/profile");
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div
        className="relative w-full h-screen bg-no-repeat bg-center bg-cover bg-fixed"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="w-full h-full bg-black lg:bg-opacity-50">
          <nav className="px-11 py-5">
            <img src={logo} alt="logo" className="h-14"></img>
          </nav>
          <div className="flex justify-center">
            <div className=" w-full bg-black bg-opacity-70 px-16 py-16 mt-2 rounded-md self-center lg:2/5 lg:max-w-md">
              <h2 className="text-white mb-8 text-3xl font-semibold">
                {Variant === "register" ? "Register" : "Sign In"}
              </h2>
              <div className="flex flex-col gap-4">
                {Variant === "register" && (
                  <Input
                    id="username"
                    onChange={(e) => setUsername(e.target.value)}
                    label="usename"
                    type="text"
                    value={Username}
                    required
                  />
                  
                )}
                {errors.username && (
                  <p className="text-red-600 ">{errors.username}</p>
                )}
                <Input
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  label="email"
                  type="email"
                  value={Email}
                  required
                />
                {errors.email && (
                  <p className="text-red-600 ">{errors.email}</p>
                )}
                <Input
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  label="password"
                  type="password"
                  value={Password}
                  required
                />
                {errors.password && (
                  <p className="text-red-600 ">{errors.password}</p>
                )}
              </div>
              {loading ? (
                <button className="bg-red-600 py-3 hover:bg-red-700 w-full mt-10 rounded-md transition">
                  <ClipLoader color="white" />
                </button>
              ) : (
                <button
                  className="bg-red-600 py-3 hover:bg-red-700 w-full mt-10 rounded-md transition"
                  onClick={
                    Variant === "register"
                      ? () => register(Username, Email, Password)
                      : () => login(Email, Password)
                  }
                >
                  {Variant === "login" ? "Login" : "Register"}
                </button>
              )}

              <div className="flex flex-row gap-4 mt-8 items-center justify-center">
                <div onClick={()=> {window.location.href = `https://netflix-watch-web.vercel.app/api/v1/auth/google`}} className="w-10 h-10 bg-white rounded-full hover:opacity-80 transition cursor-pointer flex items-center justify-center">
                  <FcGoogle size={30}/>
                </div>
                <div onClick={()=> {window.location.href = `https://netflix-watch-web.vercel.app/api/v1/auth/github`}} className="w-10 h-10 bg-white rounded-full hover:opacity-80 transition cursor-pointer flex items-center justify-center">
                  <FaGithub size={30}/>
                </div>
              </div>
              <p className="text-neutral-500 mt-12 text-center">
                {Variant === "login"
                  ? "New to Netflix ?"
                  : "Already have an account"}
                <span
                  className="text-white ml-1 hover:underline cursor-pointer "
                  onClick={toggleVariant}
                >
                  {Variant === "login" ? "Create an account" : "Login"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
