import axios from "axios";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useLocation, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const AddAndEditReview = (user) => {
  let initialReviewState = "";

  let editing = false;
  let { state } = useLocation();
  if (state && state.currentReview) {
    editing = true;
    initialReviewState = state.currentReview.text;
  }

  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const { id } = useParams();
  const handleInputChange = (event) => {
    if (!event.target.value) {
      setIsDisabled(true);
      setReview("");
    } else {
      setReview(event.target.value);
      setIsDisabled(false);
    }
  };
  const saveReview = () => {
    let data = {
      text: review.trim(),
      name: user.user.name,
      user_id: user.user.id,
      book_id: id,
    };

    if (editing) {
      data.review_id = state.currentReview._id;
      setLoading(true);

      axios
        .put(`${import.meta.env.VITE_VERCEL_API_URL}/review`, data)
        .then(() => {
          setSubmitted(true);
          setLoading(true);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setLoading(true);
      axios
        .post(`${import.meta.env.VITE_VERCEL_API_URL}/review`, data)
        .then(() => {
          setSubmitted(true);
          setLoading(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <div className="p-4 mt-4 max-w-screen-xl mx-auto">
      <div className="flex">
        <Link
          to={"/books/" + id}
          className="bg-sky-800 text-white px-4 py-1 rounded-lg w-fit"
        >
          <BsArrowLeft className="text-2xl" />
        </Link>
      </div>
      <h1 className="text-3xl mt-4">{editing ? "Edit " : "Create "}Review</h1>
      {loading ? Spinner : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl sm:w-[600px] w-[328px] p-4 mx-auto mt-10">
        {user.user ? (
          <div>
            {submitted ? (
              <div>
                <h4 className="text-xl text-gray-700">
                  Your submission has been successfully completed !
                </h4>
                <button className="p-2 bg-sky-700 mt-4 rounded-lg">
                  <Link to={"/books/" + id} className="text-white text-base">
                    Back to Book Review
                  </Link>
                </button>
              </div>
            ) : (
              <div className="my-4">
                <label htmlFor="text" className="text-xl text-gray-500">
                  Reivew
                </label>
                <input
                  type="text"
                  id="text"
                  placeholder="Kindly share your valuable review here..."
                  value={review}
                  onChange={handleInputChange}
                  className="border-2 border-gray-500 px-4 py-2 mt-4 w-full"
                />
                <button
                  className="p-2 bg-sky-300 mt-4 rounded-lg"
                  onClick={() => {
                    setIsDisabled(true);
                    saveReview();
                  }}
                  disabled={isDisabled}
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="mx-auto text-xl text-gray-500">
            <strong>Please log in to Add Review</strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddAndEditReview;
