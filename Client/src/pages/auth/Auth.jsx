import { useState } from "react";
import axios from "axios";
import heroImage from "../../assets/images/hero.jpg";
import logo from "../../assets/images/logo.png";
import Input from "../../components/Input";


const Auth = () => {
  const [Email, setEmail] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  const [Variant, setVariant] = useState("login");

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
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/register",
        dataToSend
      );
      if(response){
        console.log(response.data);
        setVariant("login")
      }
    } catch (err) {
      console.log(err);
    }
  };

  const login = async (email , password) =>{
    alert('login')
    const dataToSend = {
      email: email,
      password: password
    };
    try{
      const response = await axios.post("http://localhost:5000/api/v1/login", dataToSend);
      if(response){
        alert('login succesfully')
      }
    }catch(err)  {
      console.log(err)
    }
  }
  return (
    <>
      <div
        className="relative w-full h-full bg-no-repeat bg-center bg-cover bg-fixed"
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
                    value={Username}
                  />
                )}
                <Input
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  label="email"
                  value={Email}
                />
                <Input
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  label="password"
                  value={Password}
                />
              </div>
              <button className="bg-red-600 py-3 hover:bg-red-700 w-full mt-10 rounded-md transition" onClick={Variant === "register" ? ()=> register(Username,Email,Password) : ()=> login(Email,Password)}>
                {Variant === 'login' ? 'Login' : 'Register'}
              </button>
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
