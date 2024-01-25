import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/home/Login";
import NavBar from "./components/home/NavBar";
import AddAndEditReview from "./pages/AddAndEditReview";
import BookReview from "./pages/BookReview";
import CreateBook from "./pages/CreateBook";
import DeleteBook from "./pages/DeleteBook";
import EditBook from "./pages/EditBook";
import Home from "./pages/Home";
import ShowBook from "./pages/ShowBook";

const App = () => {
  const [user, setUser] = useState(null);
  const [isDark, setIsDark] = useState(null);

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
    <div className={`${isDark ? "bg-gray-900" : "bg-white"} border-gray-200 `}>
      <NavBar
        user={user}
        logout={logout}
        mode={(darkOrLight) => setIsDark(darkOrLight)}
      />
      <div>
        <Routes>
          <Route path="/" element={<Home user={user} appMode={isDark} />} />
          <Route
            path="/books/create"
            element={<CreateBook user={user} createMode={isDark} />}
          />
          <Route path="/books/details/:id" element={<ShowBook />} />
          <Route
            path="/books/edit/:id"
            element={<EditBook user={user} editMode={isDark} />}
          />
          <Route
            path="/books/delete/:id"
            element={<DeleteBook user={user} />}
          />
          <Route path="/books/:id" element={<BookReview user={user} />} />
          <Route
            path="/books/:id/review"
            element={<AddAndEditReview user={user} isDark={isDark} />}
          />
          <Route
            path="/login"
            element={<Login login={login} mode={isDark} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
