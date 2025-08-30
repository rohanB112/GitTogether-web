import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      //   console.log(res?.data?.data);
      dispatch(addRequests(res?.data?.data));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRequest = async (status, requestId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequest(res?.data?.data?._id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const requests = useSelector((store) => store.requests);

  const [showAcceptedToast, setShowAcceptedToast] = useState(false);
  const [showRejectedToast, setShowRejectedToast] = useState(false);

  if (!requests) return;
  if (requests.length === 0)
    return <h1 className="text-center m-10 text-xl">No requests found</h1>;

  return (
    <div className="flex flex-col text-center">
      {showAcceptedToast && (
        <div className="toast toast-top toast-center z-30">
          <div className="alert alert-success">
            <span>Request Accepted</span>
          </div>
        </div>
      )}
      {showRejectedToast && (
        <div className="toast toast-top toast-center z-30">
          <div className="alert alert-error">
            <span>Request Ignored</span>
          </div>
        </div>
      )}
      <h2 className="text-3xl m-5">Requests</h2>
      <div>
        {requests.map((request) => {
          const { firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;
          return (
            <div
              className="flex w-2xl m-4 p-4 rounded-lg bg-base-300 mx-auto items-center"
              key={request._id}
            >
              <div>
                <img
                  alt="user"
                  src={photoUrl}
                  className="w-20 h-20 rounded-full"
                />
              </div>
              <div className="text-left mx-6">
                <h2 className="font-semibold text-lg">
                  {firstName + " " + lastName}{" "}
                </h2>
                <p>{about}</p>
                {age && gender && <p>{age + " " + gender}</p>}
              </div>
              <div className="flex">
                <button
                  className="btn btn-secondary mx-4"
                  onClick={() => {
                    handleRequest("accepted", request._id);
                    setShowAcceptedToast(true);
                    setTimeout(() => {
                      setShowAcceptedToast(false);
                    }, 3000);
                  }}
                >
                  Accept
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    handleRequest("rejected", request._id);
                    setShowRejectedToast(true);
                    setTimeout(() => {
                      setShowRejectedToast(false);
                    }, 3000);
                  }}
                >
                  Ignore
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
