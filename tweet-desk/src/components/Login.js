import React, { useEffect, useRef, useState } from "react";
import { Cookies } from "react-cookie";
import { useGlobalContext } from "./context";

const Login = () => {
  const { authenticate, Enterpin, AenterPin, setaLoading, cookies } =
    useGlobalContext();
  const inputPin = useRef(null);

  return (
    <>
      <div className=" -z-20 flex justify-center mt-7 space-x-1 ">
        <div>
          <img
            className="h-6"
            src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
          ></img>
        </div>
        <div>TweetDesk</div>
      </div>
      <div className="flex justify-center mt-80 text-xl font-thin text-white">
        {AenterPin ? (
          <>
            <div
              className="border-2 border-black rounded-lg pl-3 py-1 w-96 font-thin text-gray-800"
              contentEditable="true"
              ref={inputPin}
            >
              Enter pin
            </div>
            <div>
              <button
                className="bg-cyan-400 py-1 px-3 rounded-xl shadow-xl hover:bg-cyan-300 ml-8 f"
                onClick={() => {
                  Enterpin(String(inputPin.current.innerHTML));
                  setaLoading(true);
                }}
              >
                Login
              </button>
            </div>
          </>
        ) : (
          <button
            className="bg-cyan-400 py-1 px-3 rounded-xl shadow-xl hover:bg-cyan-300  "
            onClick={() => {
              authenticate();
            }}
          >
            Login in your twitter account and authorize
          </button>
        )}
      </div>
    </>
  );
};

export default Login;
