import { useEffect, useState } from "react";
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
  const [user, setUser] = useState(null);

  /**
   * old code
  const initialInfoState = {
    name: "",
    id: "",
  };
  const [userInfo, setUserInfo] = useState(initialInfoState);
  const [limit, setLimit] = useState(0);
  let count = 0;
   */

  useEffect(() => {
    if (user != null) {
      sessionStorage.setItem("userInfo", JSON.stringify(user));
    } else {
      setUser(JSON.parse(sessionStorage.getItem("userInfo")));
    }
  }, [user]);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
    sessionStorage.removeItem("userInfo");
  }

  /*
old code for reference
const userLogin = async () => {
  try {
    let Info = await JSON.parse(sessionStorage.getItem("userInfo"));
    setUserInfo(Info);
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
*/
  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 pb-3 max-sm:pb-4">
        <div className="max-sm:flex max-sm:flex-wrap max-sm:items-baseline max-w-screen-xl flex flex-wrap items-center justify-between mx-auto md:p-3">
          <a href="/" className="flex items-center space-x-2">
            <img
              src="books.png"
              className="max-sm:hidden max-sm:h-8 pt-4 pl-4"
              alt="Logo"
            />
            <span className="pt-4 max-sm:pl-3 text-xl self-center sm:text-2xl font-semibold whitespace-nowrap dark:text-white">
              Bookstore
            </span>
          </a>
          <div>
            <ul className="text-base flex flex-row items-baseline p-3 md:p-0 mt-4 md:gap-8 space-x-4 m-0">
              <li>
                <a
                  href="/"
                  className="text-lg max-sm:text-base text-gray-900 hover:text-blue-700 dark:text-blue-500 dark:hover:text-white"
                  aria-current="page"
                >
                  Books
                </a>
              </li>
              <li>
                {user ? (
                  <a
                    onClick={logout}
                    className="text-lg max-sm:text-base text-gray-900 hover:text-blue-700 dark:text-blue-500 dark:hover:text-white pr-3"
                    style={{ cursor: "pointer" }}
                  >
                    Logout{" "}
                    <strong className="text-sky-400 hover:text-blue-700 dark:hover:text-white text-xl pl-1">
                      {user.name}
                    </strong>
                  </a>
                ) : (
                  <Link
                    to={"/login"}
                    className="text-lg max-sm:text-base text-gray-900 hover:text-blue-700 dark:text-blue-500 dark:hover:text-white pr-3"
                  >
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/books/create" element={<CreateBook user={user} />} />
          <Route path="/books/details/:id" element={<ShowBook />} />
          <Route path="/books/edit/:id" element={<EditBook user={user} />} />
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
