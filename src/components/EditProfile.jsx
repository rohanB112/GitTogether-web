import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [skills, setSkills] = useState(user.skills);

  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async (req, res) => {
    try {
      res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          about,
          photoUrl,
          age,
          gender,
          skills,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));

      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {showToast && (
        <div className="toast toast-top toast-center z-30">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <div>
          <div className="flex justify-center m-10">
            <div className="card card-border bg-base-200 w-lg">
              <div className="card-body px-10">
                <h2 className="card-title justify-center">Edit Profile</h2>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    value={firstName}
                    className="input w-full"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    value={lastName}
                    className="input w-full"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">About</legend>
                  <input
                    type="text"
                    value={about}
                    className="input w-full"
                    onChange={(e) => {
                      setAbout(e.target.value);
                    }}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Photo Url</legend>
                  <input
                    type="text"
                    value={photoUrl}
                    className="input w-full"
                    onChange={(e) => {
                      setPhotoUrl(e.target.value);
                    }}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="text"
                    value={age}
                    className="input w-full"
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Gender</legend>
                  <input
                    type="text"
                    value={gender}
                    className="input w-full"
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Skills</legend>
                  <input
                    type="text"
                    value={skills}
                    className="input w-full"
                    onChange={(e) => {
                      setSkills(e.target.value);
                    }}
                  />
                </fieldset>

                <div className="card-actions justify-center">
                  <button className="btn btn-primary" onClick={saveProfile}>
                    Save profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <UserCard
            user={{ firstName, lastName, about, photoUrl, age, skills, gender }}
          />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
