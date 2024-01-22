import axios from "axios";
import { useEffect, useState } from "react";
import { MdOutlineAddBox } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import BookCards from "../components/home/BookCards";
import BooksTable from "../components/home/BooksTable";
import PaginationBar from "../components/home/PaginationBar";
import Search from "../components/home/Search";

const Home = ({ user, appMode }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("card");

  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("title");
  const [defaultQuery, setDefaultQuery] = useState("");
  const [totalItemCount, setTotalItemCount] = useState("");
  const totalPages = Math.ceil(totalItemCount / 6);
  const [searchParams, setSearchParams] = useSearchParams();
  let searchPage = searchParams.get("page") || 1;

  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    async function retrieveBooks() {
      setLoading(true);
      await axios
        .get(
          `${
            import.meta.env.VITE_VERCEL_API_URL
          }/books?${searchBy}=${defaultQuery}&page=${searchPage - 1}`
        )
        .then((response) => {
          setBooks(response.data.books);
          setTotalItemCount(response.data.total_results);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
    retrieveBooks();
  }, [searchParams, defaultQuery]);

  useEffect(() => {
    setIsDark(appMode);
  }, [appMode]);

  const querySubmitHandle = (event) => {
    event.preventDefault();
    setDefaultQuery(searchQuery);
    setSearchQuery("");
  };

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <div className="flex sm:justify-between sm:flex-row-reverse sm:items-center sm:mx-4 sm:gap-x-4 gap-y-4  flex-col justify-end items-end ">
        <form onSubmit={querySubmitHandle}>
          <div className="flex">
            <label
              htmlFor="search-dropdown"
              className={`${
                isDark ? "text-white" : "text-gray-900"
              } mb-2 text-sm font-medium  sr-only dark:`}
            >
              selvan0023@gmail.com
            </label>
            <Search
              search={(filter) => {
                setSearchBy(filter);
              }}
              mode={isDark}
            />

            <div className="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`${
                  isDark
                    ? "bg-gray-700 border-s-gray-700  border-gray-600 placeholder-gray-400 text-white focus:border-blue-500"
                    : "text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500  bg-gray-50"
                } block p-2.5 w-full z-20 text-xs sm:text-sm  rounded-e-lg border-s-gray-50 border-s-2 border`}
                placeholder="Search E.L.James, Nancy katyal, 2011..."
              />
              <button
                type="submit"
                className={`${
                  isDark
                    ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                    : "focus:ring-blue-300 hover:bg-blue-800 bg-blue-700"
                } absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white rounded-e-lg border border-blue-700  focus:ring-4 focus:outline-none `}
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>

        <div className="flex gap-x-4">
          <label
            htmlFor="list-view"
            className="block mb-2 text-sm font-medium text-gray-900 sr-only"
          >
            Select an List view
          </label>
          <select
            id="list-view"
            onChange={({ target }) => {
              setShowType(target.value);
            }}
            className={`${
              isDark
                ? "bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            } text-xs  border  sm:text-sm rounded-lg  block w-24 sm:w-32 p-2 sm:p-2.5 `}
          >
            <option value="card" defaultValue={"card"}>
              Cards view
            </option>
            <option
              // onClick={() => setShowType("table")}
              value="table"
            >
              Table view
            </option>
          </select>
        </div>
      </div>

      <div className="flex justify-between items-center mx-4">
        <h1 className=" text-2xl sm:text-3xl my-8">Books List</h1>

        <div className="my-4"></div>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl sm:text-5xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} user={user} />
      ) : (
        <BookCards books={books} user={user} cardsMode={isDark} />
      )}

      <PaginationBar
        currentPage={searchPage}
        totalPage={totalPages}
        paginationMode={isDark}
      />
    </div>
  );
};

export default Home;
