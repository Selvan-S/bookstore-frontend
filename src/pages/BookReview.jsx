import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import API_URL from "../../config/global";

const BookReview = (user) => {
  const rpc = axios.create({
    baseURL: "localhost:5173",
    proxy: false,
  });
  const initialBookState = {
    id: null,
    title: "",
    author: "",
    publishYear: "",
    reviews: [],
  };
  const [book, setBook] = useState(initialBookState);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/books/id/${id}`)
      .then((response) => {
        setBook(response.data[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);
  const deleteReview = (reviewId, index) => {
    axios
      .delete(`${API_URL}/review/${reviewId}`, {
        data: { user_id: user.user.id },
      })
      .then((response) => {
        setBook((prevState) => {
          prevState.reviews.splice(index, 1);
          return {
            ...prevState,
          };
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const bookId = book._id;
  const bookTitle = book.title;
  const bookAuthor = book.author;
  const bookPublishYear = book.publishYear;
  const reviewLen = book.reviews.length;
  const reviews = book.reviews;

  return (
    <div className="p-4 mt-4 max-w-screen-xl mx-auto">
      <BackButton />
      <h1 className="text-3xl mt-4">Book Reviews</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p4 mt-10">
            <div className="my-4 px-4">
              <span className="text-sm mr-4 text-gray-500">ID</span>
              <span>{bookId}</span>
            </div>
            <div className="my-4 px-4">
              <span className="text-sm mr-4 text-gray-500">Title</span>
              <span>{bookTitle}</span>
            </div>
            <div className="my-4 px-4">
              <span className="text-sm mr-4 text-gray-500">Author</span>
              <span>{bookAuthor}</span>
            </div>
            <div className="my-4 px-4">
              <span className="text-sm mr-4 text-gray-500">Publish Year</span>
              <span>{bookPublishYear}</span>
            </div>
            <Link
              to={"/books/" + id + "/review"}
              className="bg-sky-800 text-white px-4 py-1 rounded-lg w-fit text-base mx-4 my-4"
            >
              Add Review
            </Link>
          </div>
          <div>
            <h2 className="text-2xl mt-4 mx-4">Reviews</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3">
              {reviewLen > 0 ? (
                reviews.map((review, index) => {
                  return (
                    <div className="flex" key={review._id}>
                      <div className="border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl">
                        <div className="flex justify-start items-center gap-x-2">
                          <p className="my-1">
                            {review.text}
                            <br />
                          </p>
                        </div>
                        <strong className="my-1">User: </strong>
                        {review.name}
                        <br />
                        <strong className="my-1">Date: </strong>
                        {new Date(review.updatedAt).toString()}
                        {user.user && user.user.id === review.user_id && (
                          <div className="flex justify-around mt-4 mb-2">
                            <a
                              onClick={() => deleteReview(review._id, index)}
                              className="bg-sky-800 text-white px-4 py-1 rounded-lg w-fit text-base cursor-pointer"
                            >
                              Delete
                            </a>
                            <Link
                              to={{
                                pathname: "/books/" + id + "/review",
                              }}
                              state={{ currentReview: review }}
                              className="bg-sky-800 text-white px-6 py-1 rounded-lg w-fit text-base"
                            >
                              Edit
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex ">
                  <p className="text-base my-4 mx-4">No reviews yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookReview;
