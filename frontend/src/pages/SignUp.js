import React, { useState } from "react";
import loginIcons from "../assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imagetobase64 from "../helpers/imageTobase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";
function SignUp() {
  const [showPassword, setshowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    profilePics: "",
  });

  const navigate = useNavigate()


  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  console.log("data login", data);

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imagetobase64(file);
    setData((preve) => {
      return {
        ...preve,
        profilePics: imagePic,
      };
    });

    // console.log("imagePic", imagePic)
    // console.log("file", file)
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (data.password === data.confirmPassword) {
      console.log("SummaryApi.signUp.url", SummaryApi.signUp.url)
      const dataResponse = await fetch("http://localhost:8080/api/signup" , {
        method: SummaryApi.signUp.method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();

      if(dataApi.success){
        toast.success(dataApi.message)
        navigate("/login")
      }
      if(dataApi.error){
        toast.error(dataApi.message)
      }

      console.log("data", dataApi);
    } else {
      console.log("please check password and confirm password");
    }
  };
  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePics || loginIcons} alt="login icons" />
            </div>
            <form>
              <label>
                <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                  Upload Photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Name:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="name"
                  placeholder="enter your name"
                  name="name"
                  value={data.name}
                  required
                  onChange={handleChange}
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label>Email:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="enter email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div>
              <label>Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="enter password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setshowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>
            <div>
              <label> Confirm Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="enter confirm password"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowConfirmPassword((preve) => !preve)}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Sign up
            </button>
          </form>
          <p className="my-5">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-red-600 hover:underline hover:text-red-700"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
