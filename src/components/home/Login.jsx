import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = (login) => {
  const initialUserState = {
    name: "",
    id: "",
  };
  const navigate = useNavigate();
  const [user, setUser] = useState(initialUserState);
  const [isDisabled, setIsDisabled] = useState(true);
  const [nameAlert, setNameAlert] = useState(true);
  const [idAlert, setIdAlert] = useState(true);

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  const userLogin = () => {
    login.login(user);
    sessionStorage.setItem("userInfo", JSON.stringify(user));
    navigate("/");
  };
  return (
    <div className="w-full max-w-xs mx-auto my-16">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {nameAlert && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-1 rounded relative mb-1"
            role="alert"
          >
            <strong className="font-bold">Username </strong>
            <span className="block sm:inline">required!</span>
          </div>
        )}
        {idAlert && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-1 rounded relative mb-1"
            role="alert"
          >
            <strong className="font-bold">User ID </strong>
            <span className="block sm:inline">required!</span>
          </div>
        )}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            User ID
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
