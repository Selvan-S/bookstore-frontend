import axios from "axios";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const CreateBook = ({ user }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleSaveBook = () => {
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
        // alert("An error happened. Please Check console");
        enqueueSnackbar("An error happened. Please Check console", {
          variant: "error",
        });
        console.log(error);
      });
  };
  return (
    <div className="p-4 mt-4 max-w-screen-xl mx-auto">
      <BackButton />
      <h1 className="text-3xl mt-4">Create Book</h1>
      {loading ? Spinner : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl sm:w-[600px] w-[328px] p-4 mx-auto mt-10">
        {user ? (
          <div>
            <div className="my-4">
              <label htmlFor="title" className="text-xl mr-4 text-gray-500">
                Title
              </label>
              <input
                id="title"
                placeholder="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-2 border-gray-500 px-4 py-2 w-full"
              />
            </div>
            <div className="my-4">
              <label htmlFor="author" className="text-xl mr-4 text-gray-500">
                Author
              </label>
              <input
                id="author"
                placeholder="author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="border-2 border-gray-500 px-4 py-2 w-full"
              />
            </div>
            <div className="my-4">
              <label
                htmlFor="publishYear"
                className="text-xl mr-4 text-gray-500"
              >
                Publish Year
              </label>
              <input
                id="publishYear"
                placeholder="year"
                type="text"
                value={publishYear}
                onChange={(e) => setPublishYear(e.target.value)}
                className="border-2 border-gray-500 px-4 py-2 w-full"
              />
            </div>
            <div className="my-4">
              <label htmlFor="about" className="text-xl mr-4 text-gray-500">
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
                className="border-2 border-gray-500 px-4 py-2 w-full"
              />
            </div>
            <button
              className="w-full p-2 bg-sky-300 my-4"
              onClick={() => {
                setIsDisabled(true);
                handleSaveBook();
              }}
              disabled={isDisabled}
            >
              Save
            </button>
          </div>
        ) : (
          <div className="mx-auto text-xl text-gray-500">
            <strong>Please log in to Create Book</strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateBook;
