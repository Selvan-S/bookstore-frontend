import axios from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const CreateBook = ({ user, createMode }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const [alert, setAlert] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleSaveBook = () => {
    if (!title || !author || !publishYear) {
      setAlert(true);
    } else {
      setIsDisabled(true);
      setAlert(false);
      const data = {
        title: title.trim(),
        author: author.trim(),
        publishYear: publishYear.trim(),
        about: about.trim(),
        userId: user.id,
        userName: user.name,
      };
      setLoading(true);
      axios
        .post(`${import.meta.env.VITE_VERCEL_API_URL}/books`, data)
        .then(() => {
          setLoading(false);
          enqueueSnackbar("Book Created successfully", { variant: "success" });
          navigate("/");
        })
        .catch((error) => {
          setLoading(false);
          enqueueSnackbar("An error happened. Please Check console", {
            variant: "error",
          });
          console.log(error);
        });
    }
  };
  return (
    <div className="p-4 mt-4 max-w-screen-xl mx-auto">
      <BackButton />
      <h1 className="text-3xl mt-4">Create Book</h1>
      {loading ? Spinner : ""}
      <div className="flex flex-col border-2 border-sky-800 rounded-xl sm:max-w-[600px] p-4 mx-auto mt-10 max-sm:mx-4">
        {user ? (
          <div>
            {alert && (
              <div
                className="flex gap-2 bg-red-100 border border-red-400 text-red-700 px-4 py-1 rounded relative mb-1"
                role="alert"
              >
                <strong className="font-bold">All fields</strong>
                <span className="block sm:inline">required!</span>
              </div>
            )}
            <div className="mb-4">
              <label
                htmlFor="title"
                className={`${
                  createMode ? "text-gray-400" : "text-gray-500"
                } text-xl text-gray-500`}
              >
                Title
              </label>
              <input
                id="title"
                placeholder="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className={`${
                  createMode
                    ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    : "border-gray-300 text-gray-900 bg-gray-50 focus:ring-primary-600 focus:border-primary-600"
                }  border sm:text-sm rounded-lg  block w-full p-2.5`}
              />
            </div>
            <div className="my-4">
              <label
                htmlFor="author"
                className={`${
                  createMode ? "text-gray-400" : "text-gray-500"
                } text-xl text-gray-500`}
              >
                Author
              </label>
              <input
                id="author"
                placeholder="author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                className={`${
                  createMode
                    ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    : "border-gray-300 text-gray-900 bg-gray-50 focus:ring-primary-600 focus:border-primary-600"
                }  border  sm:text-sm rounded-lg  block w-full p-2.5`}
              />
            </div>
            <div className="my-4">
              <label
                htmlFor="publishYear"
                className={`${
                  createMode ? "text-gray-400" : "text-gray-500"
                } text-xl text-gray-500`}
              >
                Publish Year
              </label>
              <input
                id="publishYear"
                placeholder="year"
                type="text"
                value={publishYear}
                required
                onChange={(e) => setPublishYear(e.target.value)}
                className={`${
                  createMode
                    ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    : "border-gray-300 text-gray-900 bg-gray-50 focus:ring-primary-600 focus:border-primary-600"
                }  border  sm:text-sm rounded-lg  block w-full p-2.5`}
              />
            </div>
            <div className="my-4">
              <label
                htmlFor="about"
                className={`${
                  createMode ? "text-gray-400" : "text-gray-500"
                } text-xl text-gray-500`}
              >
                About book
              </label>
              <textarea
                placeholder="About this book! (optional)"
                name="about"
                id="about"
                cols="18"
                rows="4"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className={`${
                  createMode
                    ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    : "border-gray-300 text-gray-900 bg-gray-50 focus:ring-primary-600 focus:border-primary-600"
                }  border  sm:text-sm rounded-lg  block w-full p-2.5`}
              />
            </div>
            <button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => {
                handleSaveBook();
              }}
              disabled={isDisabled}
            >
              Save
            </button>
          </div>
        ) : (
          <div className="mx-auto text-xl">
            <strong>Please log in to Create Book</strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateBook;
