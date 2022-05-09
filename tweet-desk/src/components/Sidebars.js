import React from "react";
import { useGlobalContext } from "./context";

const Sidebars = () => {
  const { authenticate } = useGlobalContext();
  return (
    <>
      <div className="fixed top-11 h-screen w-11 bg-gray-300 "></div>
      <div className="fixed h-11 w-screen bg-gray-300 ">
        <div className="flex justify-start py-1  flex-nowrap w-auto ">
          <div className="mx-1">
            <button>
              <img
                className="mx-auto h-9 rounded-full hover:ring-4  sm:mx-0 sm:shrink-0"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2WWJEImdtBVeLhMDBgSTAfvvju5KltNqo2A&usqp=CAU"
                alt="Woman's Face"
              />
            </button>
          </div>
          <div className="mx-1">
            <button>
              <img
                className="mx-auto  h-9 rounded-full  hover:ring-4 sm:mx-0 sm:shrink-0"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC3I7gds6qoPcD7eNTdWNaYAYttpVqJLQKjw&usqp=CAU"
                alt="Woman's Face"
              />
            </button>
          </div>
          <div className="mx-1">
            <button className="">
              <img
                className="mx-auto h-9 rounded-full hover:ring-4 m:mx-0 sm:shrink-0"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKDeYkGVyoE3xtyrVRiAzl20Xc8nR6bvVngw&usqp=CAU"
                alt="Woman's Face"
              />
            </button>
          </div>
          <div className="mx-1 ml-2 ">
            <button>
              <img
                className="mx-auto relative top-1 h-7 rounded-full sm:mx-0 sm:shrink-0"
                src="https://cdn-icons-png.flaticon.com/512/1828/1828926.png"
                alt="Woman's Face"
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
