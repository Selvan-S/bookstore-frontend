import axios from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const DeleteBook = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const [isDisabled, setIsDisabled] = useState(false);
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
  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`${import.meta.env.VITE_VERCEL_API_URL}/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book is Deleted successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please Check console");
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };
  return (
    <div className="p-4 mt-4 max-w-screen-xl mx-auto">
      <BackButton />
      <h1 className="text-3xl mt-4">Delete Book</h1>
      {loading ? Spinner : ""}
      {user ? (
        <div>
          {book.userName === user.name && book.userId === user.id ? (
            <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl max-w-[600px] p-8 mx-auto mt-10 max-sm:mx-5">
              <div className="my-4">
                <span className="text-2xl mr-4 text-gray-500">TITLE</span>
                <span className="text-2xl">{book.title}</span>
              </div>
              <h3 className="text-xl">
                Are you certain you want to delete this book?
              </h3>
              <button
                className="p-4 bg-red-600 text-white m-8 w-full"
                onClick={() => {
                  setIsDisabled(true);
                  handleDeleteBook();
                }}
                disabled={isDisabled}
              >
                Yes, Delete it
              </button>
            </div>
          ) : (
            <div className="flex justify-center max-w-[600px] border-2 border-sky-800 rounded-xl p-8 mx-auto mt-10 text-xl max-sm:mx-5">
              <strong>This book was not created by you.</strong>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center max-w-[600px] border-2 border-sky-800 rounded-xl p-8 mx-auto mt-10 text-xl max-sm:mx-5">
          <strong>Please log in to Delete Book</strong>
        </div>
      )}
    </div>
  );
};

export default DeleteBook;
