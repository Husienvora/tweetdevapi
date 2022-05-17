import React, { useEffect, useState } from "react";
import { useGlobalContext } from "./context";

const Sidebars = () => {
  const {
    setaLogin,
    User_avatar,
    UserAvatar,
    setUserAvatar,
    setaLoading,
    LoggedIn,
    Users,
  } = useGlobalContext();
  const demo = ["Husien_vora", "elonmusk"];
  const [Flag, setFlag] = useState(false);
  console.log(Users);
  useEffect(() => {
    if (Users) {
      for (let i = 0; i <= demo.length - 1; i++) {
        User_avatar(Users[i]);
      }
    }
    //setUserAvatar([...new Set(UserAvatar)]);
  }, []);

  return (
    <>
      <div className="fixed top-11 h-screen w-11 bg-gray-300 "></div>
      <div className="fixed h-11 w-screen bg-gray-300 ">
        <div className="flex justify-start py-1  flex-nowrap w-auto ">
          {Users.map((user, index) => {
            {
              console.log(UserAvatar);
            }
            return (
              <div className="mx-1">
                <button className={user}>
                  <img
                    className="mx-auto h-9 rounded-full hover:ring-4  sm:mx-0 sm:shrink-0"
                    src={UserAvatar[user]}
                    alt=""
                  />
                </button>
              </div>
            );
          })}

          <div className="mx-1 ml-2 ">
            <button
              onClick={() => {
                setaLogin(true);
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
            <img
              className="h-6"
              src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
            ></img>
          </div>
          <div>TweetDesk</div>
        </div>
        <div className="-z-10 flex justify-end relative bottom-16 right-3">
          About project
        </div>
      </div>
    </>
  );
};

export default Sidebars;
