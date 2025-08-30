import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, about, age, gender, photoUrl } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    const res = await axios.post(
      BASE_URL + "/request/send/" + status + "/" + userId,
      {},
      { withCredentials: true }
    );

    console.log(res);
    dispatch(removeUserFromFeed(_id));
  };
  return (
    <div className="card bg-base-300 w-96 shadow-sm my-10">
      <figure className="h-56">
        <img src={photoUrl} alt="User" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        <p>Age: {age}</p>
        <p>Gender: {gender}</p>
        <p>{about}</p>

        <div className="card-actions justify-center">
          <button
            className="btn btn-primary"
            onClick={() => {
              handleSendRequest("ignored", _id);
            }}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              handleSendRequest("interested", _id);
            }}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
