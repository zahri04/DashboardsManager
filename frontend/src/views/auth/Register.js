
import dashboard from '../../assets/img/dashboard.jpg'
import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from '../../Axios';
import {Link} from 'react-router-dom';
export default function Register() {

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullName:"",
    groupNames: []
  });

  const[message,setMessage]=useState("");
  const [messageType,setMessageType]=useState("");

  

  const handleChange = (e) => {
    const {name,value}= e.target;

    if(name==="groupNames"){

      const selectedGroups=Array.from(e.target.selectedOptions)
      .map((option) => option.value);

setFormData((prevState) => ({
  ...prevState,groupNames: selectedGroups
}));


    }else{
      setFormData((prevState) => ({
        ...prevState,
        [name]: value
      }));

    }

    
  };

  const handleSubmit= async(e) => {
    e.preventDefault();

    try{
      const Response=await axios.post("register",formData);
      console.log("Response:",Response.data);
    
      setMessage(Response.data);
      setMessageType("success");
      setTimeout(()=>{
<Redirect to="/auth/login" /> // redirect after login
      },2000)

    }catch(error){
      setMessage(error.response.data);
      setMessageType("error");
      console.error("Error submitting form:", error);
    }

  
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src={dashboard}
            className="mx-auto h-25 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {/* Display success/error message */}
          {message && (
            <div
              className={`p-4 mb-6 rounded-md ${messageType === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
            >
              {message}
            </div>
          )}

          <form action="#" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="text" className="block text-sm/6 font-medium text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="text" className="block text-sm/6 font-medium text-gray-900">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="groupNames" className="block text-sm font-medium text-gray-900">
                Select Groups (you can select multiple)
              </label>
              <select
                name="groupNames"
                multiple
                value={formData.groupNames}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="MARKETING">MARKETING</option>
                <option value="FINANCE">FINANCE</option>
                <option value="ASSISTANT">ASSISTANT</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-black shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already a member?{' '}
            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </>
  );
}