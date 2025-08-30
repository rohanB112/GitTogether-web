import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);

  const getFeed = async (req, res) => {
    // if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;
  if (feed.length === 0)
    return <h1 className="text-center m-8 text-xl">End of the feed</h1>;

  return (
    feed && (
      <div className="flex justify-center">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
