import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import DateFormat from "../components/DateFormat";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_VERCEL_API_URL}/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4 mt-4 max-w-screen-xl mx-auto">
      <BackButton />
      <h1 className="text-3xl mt-4">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-800 rounded-xl max-w-96 p4 mx-auto mt-10">
          <div className="my-4 px-4">
            <span className="text-xl mr-4 text-gray-500">Title</span>
            <span>{book.title}</span>
          </div>
          <div className="my-4 px-4">
            <span className="text-xl mr-4 text-gray-500">Author</span>
            <span>{book.author}</span>
          </div>
          <div className="my-4 px-4">
            <span className="text-xl mr-4 text-gray-500">Publish Year</span>
            <span>{book.publishYear}</span>
          </div>
          {book.about != "" ? (
            <div className="my-4 px-4">
              <span className="text-xl mr-4 text-gray-500">About</span>
              <span>{book.about}</span>
            </div>
          ) : (
            <div className="my-4 px-4">
              <span className="text-xl mr-4 text-gray-500">About</span>
              <span className="text-base mr-4 text-gray-500">
                No information is provided
              </span>
            </div>
          )}
          <div className="my-4 px-4">
            <span className="text-xl mr-4 text-gray-500">
              {" "}
              <DateFormat
                createdAt={book.createdAt}
                updatedAt={book.updatedAt}
              />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
