import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

const BookModal = ({book, onClose}) => {
  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="sm:w-[600px] w-[328px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative overflow-y-scroll"
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />

        <h2 className="w-fit px-4 py-1 bg-red-300 rounded-lg">
          {book.publishYear}
        </h2>
        <h4 className="my-2 text-gray-500">{book._id}</h4>
        <div className="flex justify-start items-center gap-x-2">
          <PiBookOpenTextLight className="text-red-300 text-2xl" />
          <h2 className="my-1">{book.title}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
          <BiUserCircle className="text-red-300 text-2xl" />
          <h2 className="my-1">{book.author}</h2>
        </div>

        <p className="mt-4 text-base text-gray-500">About this Book</p>
        {book.about != "" ? (
          <div className="my-2 px-4">
            <span>{book.about}</span>
          </div>
        ) : (
          <div className="my-2 px-4">
            <span className="text-base mt-4 text-gray-500">
              No information is provided
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookModal;
