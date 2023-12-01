import React, { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBook";
import ShowBook from "./pages/ShowBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";
import BookReview from "./pages/BookReview";
import Login from "./components/home/Login";
import AddAndEditReview from "./pages/AddAndEditReview";
const App = () => {
  const initialInfoState = {
    name: "",
    id: "",
  };
  const [user, setUser] = React.useState(null);
  const [userInfo, setUserInfo] = useState(initialInfoState);
  const [limit, setLimit] = useState(0);
  let count = 0;
  
  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
    sessionStorage.removeItem("userInfo");
  }
  const userLogin = () => {
    try {
      try {
        let Info = JSON.parse(sessionStorage.getItem("userInfo"));
        setUserInfo(Info);
      } catch (error) {
        console.log(error);
      }
      login(userInfo);
    } catch (error) {
      console.log(`${error}`);
    }
  };
  if (count < 2 && limit < 2) {
    count = limit + 1;
    setLimit(count);
    userLogin();
  }
  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="public/books.png" className="h-8" alt="Bookstore Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Bookstore
            </span>
          </a>
          <ul className="font-medium flex flex-row p-4 md:p-0 mt-4 md:gap-8 space-x-8 mt-0">
            <li>
              <a
                href="/"
                className="block py-2 px-3 text-gray-900 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                aria-current="page"
              >
                Books
              </a>
            </li>
            <li>
              {user ? (
                <a
                  onClick={logout}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  style={{ cursor: "pointer" }}
                >
                  Logout{" "}
                  <strong className="text-sky-400 text-xl"> {user.name}</strong>
                </a>
              ) : (
                <Link
                  to={"/login"}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books/create" element={<CreateBook />} />
          <Route path="/books/details/:id" element={<ShowBook />} />
          <Route path="/books/edit/:id" element={<EditBook />} />
          <Route path="/books/delete/:id" element={<DeleteBook />} />
          <Route path="/books/:id" element={<BookReview user={user} />} />
          <Route
            path="/books/:id/review"
            element={<AddAndEditReview user={user} />}
          />
          <Route path="/login" element={<Login login={login} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
