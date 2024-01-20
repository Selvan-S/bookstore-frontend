import axios from "axios";
import { useEffect, useState } from "react";
import { MdOutlineAddBox } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import BookCards from "../components/home/BookCards";
import BooksTable from "../components/home/BooksTable";
import PaginationBar from "../components/home/PaginationBar";
import Search from "../components/home/Search";

const Home = ({ user }) => {
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
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              selvan0023@gmail.com
            </label>
            <Search
              search={(filter) => {
                setSearchBy(filter);
              }}
            />

            <div className="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block p-2.5 w-full z-20 text-xs sm:text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                placeholder="Search E.L.James, Nancy katyal, 2011..."
              />
              <button
                type="submit"
                className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
            className="text-xs bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-24 sm:w-32 p-2 sm:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option onClick={() => setShowType("card")} value="card" selected>
              Card view
            </option>
            <option onClick={() => setShowType("table")} value="table">
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
        <BookCards books={books} user={user} />
      )}

      <PaginationBar currentPage={searchPage} totalPage={totalPages} />
    </div>
  );
};

export default Home;
