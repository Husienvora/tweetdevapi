import React, { useEffect, useState, useRef } from "react";
import { useGlobalContext } from "./context";
import { FaSpinner } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
const Sidebars = () => {
  const {
    setaLogin,
    User_avatar,
    Users,
    cookies,
    ChangeCurruser,
    setCookie,
    setFollowing,
    setFollowers,
    Logout,
    ChangedCurr,
    setChangedCurr,
  } = useGlobalContext();

  useEffect(() => {
    for (let i = 0; i <= Users.length - 1; i++) {
      if (!eval(`cookies.${Users[i]}`)) {
        User_avatar(Users[i]);
      }
    }

    //setUserAvatar([...new Set(UserAvatar)]);
  }, []);
  if (Users.length == 0 || Users.length != parseInt(cookies.accountCount)) {
    window.location.reload();
  }

  return (
    <>
      {console.log(Users)}
      <div className="fixed top-11 h-screen w-11 bg-gray-300 ">
        <div className="flex justify-start py-1  flex-nowrap w-auto ">
          <div className="mx-1">
            <button
              onClick={() => {
                Logout();
              }}
            >
              <BiLogOut className="mt-1" size={29} />
            </button>
          </div>
        </div>
      </div>
      <div className=" fixed h-11 w-screen bg-gray-300 ">
        <div className="flex justify-start py-1  flex-nowrap w-auto ">
          {Users.map((user, index) => {
            return (
              <div className="mx-1" key={user}>
                {!eval(`cookies.${user}`) ? (
                  <div className="mt-2 ">
                    <FaSpinner className="animate-spin" size={22} />
                  </div>
                ) : (
                  <button
                    className={user}
                    onClick={() => {
                      ChangeCurruser(user);
                      setFollowers(null);
                      setFollowing(null);
                    }}
                  >
                    <img
                      className="mx-auto h-9 rounded-full hover:ring-4  sm:mx-0 sm:shrink-0"
                      src={eval(`cookies.${user}`)}
                      alt=""
                    />
                  </button>
                )}
              </div>
            );
          })}

          <div className="mx-1 ml-2 ">
            <button
              onClick={() => {
                setaLogin(true);
                setCookie("ChangedCurr", "false", { path: "/" });
              }}
            >
              <img
                className="mx-auto relative top-1 h-7 rounded-full sm:mx-0 sm:shrink-0"
                src="https://cdn-icons-png.flaticon.com/512/1828/1828926.png"
                alt="add"
              />
            </button>
          </div>
        </div>
        <div className=" -z-20 flex justify-center relative bottom-10 space-x-1 ">
          <div>
            <img className="h-6" src="./coffee.png"></img>
          </div>
          <div className=" ">TweetDesk</div>
        </div>
        <div className="-z-10 flex justify-end relative bottom-16 right-3">
          About project
        </div>
      </div>
    </>
  );
};

export default Sidebars;
