import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isSignupForm, setIsSignupForm] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.user));
      navigate("/");
    } catch (err) {
      setErrorMsg(err?.response?.data);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      navigate("/profile");
      console.log(res);
    } catch (error) {
      setErrorMsg(error?.response?.data);
    }
  };

  return (
    <div className="flex justify-center my-20">
      <div className="card card-border bg-base-200 w-96">
        <div className="card-body ">
          <h2 className="card-title justify-center">
            {isSignupForm ? "Sign Up" : "Login"}
          </h2>
          {isSignupForm && (
            <>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Firstname</legend>
                <input
                  type="text"
                  value={firstName}
                  className="input"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">LastName</legend>
                <input
                  type="text"
                  value={lastName}
                  className="input"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </fieldset>
            </>
          )}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email ID</legend>
            <input
              type="text"
              value={emailId}
              className="input"
              onChange={(e) => {
                setEmailId(e.target.value);
              }}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              value={password}
              className="input"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </fieldset>
          <p className="text-red-500">{errorMsg}</p>
          {isSignupForm ? (
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={handleSignUp}>
                Sign Up
              </button>
            </div>
          ) : (
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
            </div>
          )}
          <p
            className="text-white text-center my-5 text-md cursor-pointer hover:text-gray-300"
            onClick={() => {
              setIsSignupForm(!isSignupForm);
            }}
          >
            {isSignupForm
              ? "Already registered? Sign In here."
              : "New user? Sign up here."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
