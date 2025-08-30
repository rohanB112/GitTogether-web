import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  const connections = useSelector((store) => store.connections);

  if (!connections) return;
  if (connections.length === 0)
    return <h1 className="text-center m-10 text-xl">No connections found</h1>;

  return (
    <div className="flex flex-col text-center">
      <h2 className="text-3xl m-5">Connections</h2>
      <div>
        {connections.map((connection) => {
          const { firstName, lastName, photoUrl, age, gender, about } =
            connection;
          return (
            <div
              className="flex w-2xl m-4 p-4 rounded-lg bg-base-300 mx-auto"
              key={photoUrl}
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
