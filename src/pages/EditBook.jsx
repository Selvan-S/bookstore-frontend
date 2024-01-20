import axios from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const EditBook = ({ user }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_VERCEL_API_URL}/books/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setAbout(response.data.about);
        setUserId(response.data.userId);
        setUserName(response.data.userName);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        // alert("An error happened. Please Check console");
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  }, []);
  const handleEditBook = () => {
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
      .put(`${import.meta.env.VITE_VERCEL_API_URL}/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book is Edited successfully", { variant: "success" });
        navigate("/");
      })
      .catch((e) => {
        setLoading(false);
        // alert("An error happened. Please Check console");
        enqueueSnackbar("An error happened. Please Check console", {
          variant: "error",
        });
        console.log(e);
      });
  };
  return (
    <div className="p-4 mt-4 max-w-screen-xl mx-auto">
      <BackButton />
      <h1 className="text-3xl mt-4">Edit Book</h1>
      {loading ? Spinner : ""}
      {user ? (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl sm:w-[600px] w-[328px] p-4 mx-auto mt-10">
          {user.id === userId && user.name === userName ? (
            <div>
              <div className="my-4">
                <label className="text-xl mr-4 text-gray-500">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-2 border-gray-500 px-4 py-2 w-full"
                />
              </div>
              <div className="my-4">
                <label className="text-xl mr-4 text-gray-500">Author</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="border-2 border-gray-500 px-4 py-2 w-full"
                />
              </div>
              <div className="my-4">
                <label className="text-xl mr-4 text-gray-500">
                  Publish Year
                </label>
                <input
                  type="text"
                  value={publishYear}
                  onChange={(e) => setPublishYear(e.target.value)}
                  className="border-2 border-gray-500 px-4 py-2 w-full"
                />
              </div>
              <div className="my-4">
                <label className="text-xl mr-4 text-gray-500">About</label>
                <textarea
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
                  handleEditBook();
                }}
                disabled={isDisabled}
              >
                Save
              </button>
            </div>
          ) : (
            <div className="mx-auto text-xl text-gray-500">
              <strong>
                Please log in to Edit Book (or) This book is not created by you.
              </strong>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center border-2 border-sky-400 rounded-xl sm:w-[600px] w-[328px] p-4 mx-auto mt-10 ">
          <strong>Please Log in (or) This book is not created by you.</strong>
        </div>
      )}
    </div>
  );
};

export default EditBook;
