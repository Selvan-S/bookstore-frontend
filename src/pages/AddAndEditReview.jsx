import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import API_URL from "../../config/global";

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

  const { id } = useParams();
  const handleInputChange = (event) => {
    setReview(event.target.value);
  };

  const saveReview = () => {
    let data = {
      text: review,
      name: user.user.name,
      user_id: user.user.id,
      book_id: id,
    };

    if (editing) {
      data.review_id = state.currentReview._id;
      setLoading(true);

      axios
        .put(`${API_URL}/review`, data)
        .then((response) => {
          setSubmitted(true);
          setLoading(true);
          // console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setLoading(true);
      axios
        .post(`${API_URL}/review`, data)
        .then((response) => {
          setSubmitted(true);
          setLoading(true);
          // console.log(response.data);
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
                <label className="text-xl text-gray-500">Reivew</label>
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
                  onClick={saveReview}
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-xl mr-4 text-gray-500">Please log in.</div>
        )}
      </div>
    </div>
  );
};

export default AddAndEditReview;
