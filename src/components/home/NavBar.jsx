import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DarkModeToggle } from "../Toggle";


export default function NavBar({ user, logout, mode, queryEmpty }) {
  const [isActive, setIsActive] = useState(false);
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    mode(isDark);
  }, [isDark]);


  const emptyString = () => {
    queryEmpty();
  };

  return (
    <nav
      className={`${isDark ? "bg-gray-900" : "bg-white"}  border-gray-200 px-5`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 px-0 md:px-4">
        <Link
          onClick={emptyString}
          to={"/"}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span
            className={`${
              isDark ? "text-white" : "text-gray-900"
            } self-center text-2xl font-semibold whitespace-nowrap`}
          >
            Bookstore
          </span>
        </Link>
        <div className="flex gap-6 items-center">
          <div className="max-md:block md:hidden">
            <DarkModeToggle darkMode={(mode) => setIsDark(mode)} />
          </div>
          <button
            onClick={() => setIsActive(!isActive)}
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`${
            isActive ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul
            className={`${
              isDark
                ? "border-gray-700 md:bg-gray-900 bg-gray-800"
                : "bg-gray-50 md:bg-white"
            } font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0`}
          >
            <li>
              <Link
                onClick={emptyString}
                to={"/?page=1"}
                className={`${
                  isDark
                    ? "hover:text-white text-blue-500"
                    : "text-gray-900 hover:text-blue-700"
                } max-md:block max-md:px-3 max-md:py-2 max-md:hover:text-white max-md:hover:bg-blue-700 text-lg max-md:text-base`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              {user ? (
                <button
                  onClick={logout}
                  className={`${
                    isDark
                      ? "hover:text-white text-blue-500"
                      : "text-gray-900 hover:text-blue-700"
                  }text-lg max-sm:text-base pr-3 flex items-baseline`}
                  style={{ cursor: "pointer" }}
                >
                  Logout{" "}
                  <strong
                    className={`${
                      isDark
                        ? "text-sky-400 hover:text-white"
                        : "text-sky-400 hover:text-blue-700"
                    }   text-lg pl-2`}
                  >
                    {user.name}
                  </strong>
                </button>
              ) : (
                <Link
                  to={"/login"}
                  className={`${
                    isDark
                      ? "hover:text-white text-blue-500"
                      : "text-gray-900 hover:text-blue-700"
                  } text-lg max-sm:text-base pr-3`}
                >
                  Login
                </Link>
              )}
            </li>
            <li>
              <div className="max-md:hidden">
                <DarkModeToggle darkMode={(mode) => setIsDark(mode)} />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
