import React from "react";
import { useAuth } from "context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import AxiosInstance from "Axios.js";

export default function Profile() {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    groupNames: [],
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const fetchProfile = async () => {
    try {
      const response = await AxiosInstance.get("profile");
      const { username, fullName, groupNames } = response.data;
      setFormData((prevState) => ({
        ...prevState,
        username,
        fullName,
        groupNames,
        password: "",
      }));
    } catch (err) {
      console.log(err);
      setMessageType("error");
      setMessage("Error fetching profile: " + err.message);
    }
  };

  useEffect(() => {
    fetchProfile();
    setMessage("");
    setMessageType("");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
      let sentData={};
    try {

      if(formData.password.trim().length > 0) {
      if (formData.password !== formData.confirmPassword) {
        setMessageType("error");
        setMessage("Passwords do not match!");
        return;
      }
      sentData.password = formData.password;
      sentData.confirmPassword = formData.confirmPassword;
      }

      if (formData.fullName.trim().length < 0) {
        setMessageType("error");
        setMessage("Full name is required!");
        return;
      }

 sentData.fullName = formData.fullName;

      

      const response = await AxiosInstance.put("profile", sentData);
      setMessageType("success");
      setMessage("Profile updated successfully!");
      setTimeout(() => {
        setMessage("");
        setMessageType("");

      }, 3000);
    } catch (err) {
      console.log(err);
      setMessageType("error");
      setMessage("Error updating profile: " + err.message);
    }
  };



  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                {message && (
                  <div
                    className={`w-full px-4 mt-4 p-3 rounded text-sm font-medium shadow
      ${
        messageType === "success"
          ? "bg-green-100 text-green-800"
          :  "bg-red-100 text-red-800"
 
         
      }`}
                  >
                    {message}
                  </div>
                )}

                <hr className="mt-6 border-b-1 border-blueGray-300" />
                <h6 className="text-blueGray-700 text-xl font-bold">
                  My Profile
                </h6>
                <button
                  className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={handleSubmit}
                >
                  Update Profile
                </button>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  User Information
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        value={formData.username}
                        name="username"
                        onChange={handleChange}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        FullName
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 mt-4">
                    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                      Groups
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {formData.groupNames.map((group, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full shadow"
                        >
                          {group}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        New password
                      </label>
                      <input
                        type="password"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        New password confirmation
                      </label>
                      <input
                        type="password"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        onChange={handleChange}
                        value={formData.confirmPassword}
                        name="confirmPassword"
                      />
                    </div>
                  </div>
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
