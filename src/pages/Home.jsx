import axios from "axios";
import { useEffect, useState } from "react";
import { MdOutlineAddBox } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import API_URL from "../../config/global";
import Spinner from "../components/Spinner";
import BookCards from "../components/home/BookCards";
import BooksTable from "../components/home/BooksTable";
import PaginationBar from "../components/home/PaginationBar";

const Home = ({ user }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("card");

  const [searchTitle, setSearchTitle] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [searchPublishYear, setSearchPublishYear] = useState("");
  const [searchBy, setSearchBy] = useState("");
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
          `${API_URL}/books?${searchBy}=${defaultQuery}&page=${searchPage - 1}`
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
  }, [searchParams, searchBy, defaultQuery]);

  const findByTitle = (event) => {
    event.preventDefault();
    setSearchBy("title");
    setDefaultQuery(searchTitle);
    setSearchTitle("");
  };

  const findByAuthor = (event) => {
    event.preventDefault();
    setSearchBy("author");
    setDefaultQuery(searchAuthor);
    setSearchAuthor("");
  };

  const findByPublishYear = (event) => {
    event.preventDefault();
    setSearchBy("publishYear");
    setDefaultQuery(searchPublishYear);
    setSearchPublishYear("");
  };

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>
      <div className="flex max-sm:flex-col flex-wrap mt-8 gap-4 justify-center">
        <form onSubmit={findByTitle}>
          <label
            htmlFor="title-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
            </div>
            <input
              type="text"
              id="title-search"
              name="title-search"
              aria-label="Title Search"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="E.g. Dark Matter, ..."
            />
            <button
              type="submit"
              value="Submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
        <form onSubmit={findByAuthor}>
          <label
            htmlFor="author-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
            </div>
            <input
              type="text"
              id="author-search"
              name="author-search"
              aria-label="Author Search"
              value={searchAuthor}
              onChange={(e) => setSearchAuthor(e.target.value)}
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="E.g. Blake crouch, ..."
            />
            <button
              type="submit"
              value="Submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>

        <form onSubmit={findByPublishYear}>
          <label
            htmlFor="title-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
            </div>
            <input
              type="text"
              id="title-search"
              name="title-search"
              aria-label="Title Search"
              value={searchPublishYear}
              onChange={(e) => setSearchPublishYear(e.target.value)}
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="E.g. 2016, ..."
            />
            <button
              type="submit"
              value="Submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <div className="my-4"></div>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-5xl" />
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
