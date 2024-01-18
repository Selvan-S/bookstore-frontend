import axios from "axios";
import { useEffect, useState } from "react";
import { FcNext, FcPrevious } from "react-icons/fc";
import { MdOutlineAddBox } from "react-icons/md";
import { Link } from "react-router-dom";
import API_URL from "../../config/global";
import Spinner from "../components/Spinner";
import BookCards from "../components/home/BookCards";
import BooksTable from "../components/home/BooksTable";

const Home = ({ user }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("card");

  const [searchTitle, setSearchTitle] = useState(""); //new
  const [searchAuthor, setSearchAuthor] = useState(""); //new
  const [searchPublishYear, setSearchPublishYear] = useState(""); //new
  const [page, setPage] = useState(0);
  const [searchBy, setSearchBy] = useState("");
  const [defaultQuery, setDefaultQuery] = useState("");
  useEffect(() => {
    retrieveBooks();
  }, []);

  const retrieveBooks = async () => {
    setLoading(true);
    await axios
      .get(`${API_URL}/books?${searchBy}=${defaultQuery}&page=${page}`) //new
      .then((response) => {
        setBooks(response.data.books);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const refreshList = () => {
    retrieveBooks();
  };

  const onChangeSearchTitle = (e) => {
    //new
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };
  const onChangeSearchAuthor = (e) => {
    const searchAuthor = e.target.value;
    setSearchAuthor(searchAuthor);
  };
  const onChangeSearchPublishYear = (e) => {
    const searchPublishYear = e.target.value;
    setSearchPublishYear(searchPublishYear);
  };

  const find = (query, by) => {
    axios
      .get(`${API_URL}/books?${by}=${query}&page=${page}`)
      .then((response) => {
        setBooks(response.data.books);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    setSearchBy("title");
    setDefaultQuery(searchTitle);
    find(searchTitle, "title");
  };

  const findByAuthor = () => {
    setSearchBy("author");
    setDefaultQuery(searchAuthor);
    find(searchAuthor, "author");
  };

  const findByPublishYear = () => {
    setSearchBy("publishYear");
    setDefaultQuery(searchPublishYear);
    find(searchPublishYear, "publishYear");
  };

  const previousPage = async () => {
    const response = await axios.get(
      `${API_URL}/books?${searchBy}=${defaultQuery}&page=${page}`
    );
    if (response.data.page >= 0) {
      setPage(response.data.page - 1);
      refreshList();
      if (response.data.page == 0) {
        setPage(0);
        refreshList();
      }
    }
  };
  const nextPage = async () => {
    const response = await axios.get(
      `${API_URL}/books?${searchBy}=${defaultQuery}&page=${page}`
    );
    let totalPage = Math.round(response.data.total_results / 10);
    if (response.data.page < totalPage) {
      setPage(response.data.page + 1);
      refreshList();
      if (totalPage == response.data.page) {
        setPage(totalPage);
        refreshList();
      }
    }
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
        <div className="flex gap-1">
          <input
            type="text"
            placeholder="Search by Title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
            className="border-2 border-gray-500 px-4 py-2 rounded-lg max-sm:w-full"
          />
          <button className="p-2 bg-sky-300 rounded-lg" onClick={findByTitle}>
            Search
          </button>
        </div>
        <div className="flex gap-1">
          <input
            type="text"
            placeholder="Search by Author"
            value={searchAuthor}
            onChange={onChangeSearchAuthor}
            className="border-2 border-gray-500 px-4 py-2 rounded-lg max-sm:w-full"
          />
          <button className="p-2 bg-sky-300 rounded-lg" onClick={findByAuthor}>
            Search
          </button>
        </div>
        <div className="flex gap-1">
          <input
            type="text"
            placeholder="Search by PublishYear"
            value={searchPublishYear}
            onChange={onChangeSearchPublishYear}
            className="border-2 border-gray-500 px-4 py-2 rounded-lg max-sm:w-full"
          />
          <button
            className="p-2 bg-sky-300 rounded-lg"
            onClick={findByPublishYear}
          >
            Search
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <div className="my-4"></div>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} user={user} />
      ) : (
        <BookCards books={books} user={user} />
      )}
      <div className="flex justify-between">
        <button
          className="flex items-center p-2 bg-sky-300 rounded-lg"
          onClick={previousPage}
        >
          <FcPrevious className="text-sky-800 text-3xl" />{" "}
        </button>
        <button
          className="flex items-center p-2 bg-sky-300 rounded-lg"
          onClick={nextPage}
        >
          <FcNext className="text-sky-800 text-3xl" />
        </button>
      </div>
    </div>
  );
};

export default Home;
