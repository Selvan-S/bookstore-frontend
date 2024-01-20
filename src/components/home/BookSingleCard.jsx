import React, { useState } from "react";
import { AiOutlineEdit, AiOutlineLogin } from "react-icons/ai";
import { BiShow, BiUserCircle } from "react-icons/bi";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete, MdOutlineReviews } from "react-icons/md";
import { PiBookOpenTextLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import BookModal from "./BookModal";

const BookSingleCard = ({ book, user }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      key={book._id}
      className="border-2 border-gray-500 rounded-lg px-3 py-2 m-4 relative hover:shadow-xl"
    >
      <h2 className="absolute top-1 right-2 px-5 py-2 flex items-center gap-1 text-sm text-gray-900  border focus:outline-none focus:ring-4  font-medium bg-red-300 dark:gray-900 border-gray-600 hover:border-gray-600 focus:ring-gray-700 rounded-lg">
        <span className="text-xs text-gray-900 dark:gray-900">
          {book.publishYear}
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
          className="flex items-center gap-1 text-xs text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 py-2 px-2"
          onClick={() => setShowModal(true)}
        >
          <BiShow className="text-xs text-gray-900 dark:text-white cursor-pointer" />
          Show
        </button>
        <Link to={`/books/` + book._id}>
          <button className="flex items-center gap-1 text-xs text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 py-2 px-2">
            <MdOutlineReviews className="text-xs text-gray-900 dark:text-white" />
            Review
          </button>
        </Link>
        <Link to={`/books/details/${book._id}`}>
          <button className="flex items-center gap-1 text-xs text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 py-2 px-2">
            <BsInfoCircle className="text-xs text-gray-900 dark:text-white" />
            Info
          </button>
        </Link>

        {user ? (
          <>
            {book.userId === user.id && book.userName === user.name && (
              <div className="flex">
                <Link to={`/books/edit/${book._id}`}>
                  <button className="flex items-center gap-1 text-xs text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 py-2 px-2">
                    <AiOutlineEdit className="text-xs text-gray-900 dark:text-white" />
                    Edit
                  </button>
                </Link>
                <Link to={`/books/delete/${book._id}`}>
                  <button className="flex items-center gap-1 text-xs text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 py-2 px-2 absolute top-10 right-2">
                    <MdOutlineDelete className="text-sm text-gray-900 dark:text-white" />
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
              className="flex items-center gap-1 text-xs text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 py-2 px-2"
            >
              <AiOutlineLogin className="text-xs text-gray-900 dark:text-white" />
              Log in
            </button>
          </Link>
        )}
      </div>
      {showModal && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default BookSingleCard;
