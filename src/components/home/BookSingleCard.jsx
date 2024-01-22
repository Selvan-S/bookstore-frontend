import React, { useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlineLogin } from "react-icons/ai";
import { BiShow, BiUserCircle } from "react-icons/bi";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete, MdOutlineReviews } from "react-icons/md";
import { PiBookOpenTextLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import BookModal from "./BookModal";

const BookSingleCard = ({ book, user, singleCardMode }) => {
  const [showModal, setShowModal] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(singleCardMode);
  }, [singleCardMode]);

  return (
    <div
      key={book._id}
      className="border-2 border-gray-500 rounded-lg px-3 py-2 m-4 relative hover:shadow-xl"
    >
      <h2 className="absolute top-1 right-2 px-5 py-2 flex items-center gap-1 text-sm text-gray-900  border focus:outline-none focus:ring-4  font-medium bg-red-300 dark:gray-900 border-gray-600 hover:border-gray-600 focus:ring-gray-700 rounded-lg">

        <span className={`text-gray-900 text-xs `}>
          <strong>{book.publishYear}</strong>
        </span>
      </h2>
      <div className="flex justify-start items-center gap-x-2">
        <PiBookOpenTextLight className="text-red-300 text-2xl" />
        <h2 className="my-1">{book.title}</h2>
      </div>
      <div className="flex justify-start items-center gap-x-2">
        <BiUserCircle className="text-red-300 text-2xl" />
        <h2 className="my-1">{book.author}</h2>
      </div>

      <div className="flex justify-between items-center mt-4 py-4 px-0">
        <button

          className={`${
            isDark
              ? "text-white bg-gray-800 border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
              : "text-gray-900 focus:ring-gray-200 hover:bg-gray-100 bg-white border-gray-300"
          } flex border items-center gap-1 text-xs focus:outline-none focus:ring-4 font-medium rounded-full  py-2 px-2`}
          onClick={() => setShowModal(true)}
        >
          <BiShow
            className={`${
              isDark ? "text-white" : "text-gray-900"
            } text-xs cursor-pointer`}
          />
          Show
        </button>
        <Link to={`/books/` + book._id}>
          <button
            className={`${
              isDark
                ? "text-white bg-gray-800 border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
                : "text-gray-900 focus:ring-gray-200 hover:bg-gray-100 bg-white border-gray-300"
            } flex items-center border gap-1 text-xs focus:outline-none focus:ring-4 font-medium rounded-full  py-2 px-2`}
          >
            <MdOutlineReviews
              className={`${
                isDark ? "text-white" : "text-gray-900"
              } text-xs cursor-pointer`}
            />
            Review
          </button>
        </Link>
        <Link to={`/books/details/${book._id}`}>

          <button
            className={`${
              isDark
                ? "text-white bg-gray-800 border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
                : "text-gray-900 focus:ring-gray-200 hover:bg-gray-100 bg-white border-gray-300"
            } flex border items-center gap-1 text-xs focus:outline-none focus:ring-4 font-medium rounded-full  py-2 px-2`}
          >
            <BsInfoCircle
              className={`${
                isDark ? "text-white" : "text-gray-900"
              } text-xs cursor-pointer`}
            />
            Info
          </button>
        </Link>

        {user ? (
          <>
            {book.userId === user.id && book.userName === user.name && (
              <div className="flex">
                <Link to={`/books/edit/${book._id}`}>

                  <button
                    className={`${
                      isDark
                        ? "text-white bg-gray-800 border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
                        : "text-gray-900 focus:ring-gray-200 hover:bg-gray-100 bg-white border-gray-300"
                    } flex border items-center gap-1 text-xs focus:outline-none focus:ring-4 font-medium rounded-full  py-2 px-2`}
                  >
                    <AiOutlineEdit
                      className={`${
                        isDark ? "text-white" : "text-gray-900"
                      } text-xs cursor-pointer`}
                    />
                    Edit
                  </button>
                </Link>
                <Link to={`/books/delete/${book._id}`}>

                  <button
                    className={`${
                      isDark
                        ? "text-white bg-gray-800 border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
                        : "text-gray-900 focus:ring-gray-200 hover:bg-gray-100 bg-white border-gray-300"
                    } flex border items-center gap-1 text-xs focus:outline-none focus:ring-4 font-medium rounded-full  py-2 px-2 absolute top-10 right-2`}
                  >
                    <MdOutlineDelete
                      className={`${
                        isDark ? "text-white" : "text-gray-900"
                      } text-xs cursor-pointer`}
                    />
                    Delete
                  </button>
                </Link>
              </div>
            )}
          </>
        ) : (
          <Link to={"/login"}>
            <button
              type="button"

              className={`${
                isDark
                  ? "text-white bg-gray-800 border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
                  : "text-gray-900 focus:ring-gray-200 hover:bg-gray-100 bg-white border-gray-300"
              } flex border items-center gap-1 text-xs focus:outline-none focus:ring-4 font-medium rounded-full py-2 px-2`}
            >
              <AiOutlineLogin
                className={`${
                  isDark ? "text-white" : "text-gray-900"
                } text-xs cursor-pointer`}
              />
              Log in
            </button>
          </Link>
        )}
      </div>
      {showModal && (
        <BookModal
          book={book}
          onClose={() => setShowModal(false)}
          showModalMode={isDark}
        />
      )}
    </div>
  );
};

export default BookSingleCard;
