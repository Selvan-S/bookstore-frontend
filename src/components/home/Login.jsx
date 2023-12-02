import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = (login) => {
  const initialUserState = {
    name: "",
    id: "",
  };
  const navigate = useNavigate();
  const [user, setUser] = useState(initialUserState);
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
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="username"
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
            for="password"
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
            Don't forget your User ID.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={userLogin}
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
