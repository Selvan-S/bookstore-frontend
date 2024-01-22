import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ login, mode }) => {
  const initialUserState = {
    name: "",
    id: "",
  };
  const navigate = useNavigate();
  const [user, setUser] = useState(initialUserState);
  const [isDisabled, setIsDisabled] = useState(true);
  const [nameAlert, setNameAlert] = useState(true);
  const [idAlert, setIdAlert] = useState(true);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (user.name) {
      setNameAlert(false);
      if (user.id) {
        setIsDisabled(false);
        setIdAlert(false);
      } else {
        setIdAlert(true);
        setIsDisabled(true);
      }
    } else {
      setIsDisabled(true);
      setNameAlert(true);
    }
  }, [user]);
  useEffect(() => {
    setIsDark(mode);
  }, [mode]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  const userLogin = () => {
    login(user);
    sessionStorage.setItem("userInfo", JSON.stringify(user));
    navigate("/");
  };
  return (
    <div
      className={`flex flex-col items-center justify-center px-6 py-8 mx-auto max-w-md`}
    >
      <form
        className={`${
          isDark ? "bg-gray-800 border-gray-700" : "bg-white"
        } w-full rounded-lg shadow dark:border border-gray-700 px-8 pt-6 pb-8 mb-4`}
      >
        {nameAlert && (
          <div
            className="flex gap-2 bg-red-100 border border-red-400 text-red-700 px-4 py-1 rounded relative mb-1"
            role="alert"
          >
            <strong className="font-bold">Username</strong>
            <span className="block sm:inline">required!</span>
          </div>
        )}
        {idAlert && (
          <div
            className="flex gap-2 bg-red-100 border border-red-400 text-red-700 px-4 py-1 rounded relative mb-1"
            role="alert"
          >
            <strong className="font-bold">User ID</strong>
            <span className="block sm:inline">required!</span>
          </div>
        )}
        <div className="mb-4">
          <label
            className={`${
              isDark ? "text-white" : "text-gray-900"
            } block text-sm font-bold mb-2 mt-2`}
            htmlFor="username"
          >
            Username
          </label>
          <input
            className={`${
              isDark
                ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                : "border-gray-300 text-gray-900 bg-gray-50 focus:ring-primary-600 focus:border-primary-600"
            }  border  sm:text-sm rounded-lg  block w-full p-2.5`}
            id="name"
            name="name"
            type="text"
            placeholder="Username"
            required
            value={user.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-6">
          <label
            className={`${
              isDark ? "text-white" : "text-gray-900"
            } block text-sm font-bold mb-2`}
            htmlFor="password"
          >
            User ID
          </label>
          <input
            className={`${
              isDark
                ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                : "border-gray-300 text-gray-900 bg-gray-50 focus:ring-primary-600 focus:border-primary-600"
            }  border  sm:text-sm rounded-lg  block w-full p-2.5 mb-2`}
            id="id"
            name="id"
            required
            type="text"
            value={user.id}
            onChange={handleInputChange}
            placeholder="1234"
          />
          <p className="text-red-500 text-xs italic">
            Don't forget your Username and User ID.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={userLogin}
            disabled={isDisabled}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
