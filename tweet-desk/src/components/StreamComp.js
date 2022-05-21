import React, { useEffect, useState } from "react";
import { FaRetweet } from "react-icons/fa";
import { FcLike } from "react-icons/fc";

import { useGlobalContext } from "./context";
const StreamComp = () => {
  const { Stream, Streamcache } = useGlobalContext();

  const placeholder = [1, 2, 3, 4];
  useEffect(() => {
    if (Streamcache.length == 0) {
      //Stream();
    }
  }, []);

  setInterval(() => {
    //Stream();
  }, 19000);

  return (
    <>
      <div className="bg-white border-r-2 md-1:order-2">
        <div className="flex  justify-center mt-3">
          <button className="bg-cyan-400 pl-5 pr-5 pt-2 pb-2 mt-3 rounded-2xl border-2 hover:shadow-lg hover:bg-cyan-300">
            Filter
          </button>
        </div>
        <div className="relative grid grid-rows-3">
          {Streamcache.length == 0
            ? placeholder.map((data) => {
                return (
                  <div
                    key={data}
                    className=" relative mt-4 ml-3 mr-3 mb-3  h-40 rounded-md animate-pulse  border-4 border-gray-400"
                  >
                    <div className="bg-white border-b-2 mt-4 border-gray-300 h-32 mx-2 font-thin overflow-auto transition-opacity duration-300 ease-in grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-300 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-300 rounded col-span-1"></div>
                      <div className="h-2 bg-slate-300 rounded"></div>
                      <div className="h-2 bg-slate-300 rounded"></div>
                    </div>

                    <div className="flex justify-evenly">
                      <div>
                        <button></button>
                      </div>
                      <div>
                        <button></button>
                      </div>
                    </div>
                  </div>
                );
              })
            : Streamcache.map((data) => {
                return (
                  <div
                    key={data.id}
                    className=" relative mt-4 ml-3 mr-3 mb-3  h-40 rounded-md   border-4 border-gray-400"
                  >
                    <div className="bg-white border-b-2 border-gray-300 h-32 mx-2 font-thin overflow-auto transition-opacity duration-300 ease-in">
                      <div>tweet_id:{data.id}</div>
                      <div>{data.text}</div>
                    </div>
                    <div className="flex justify-evenly">
                      <div>
                        <button>
                          <FcLike size={24} />
                        </button>
                      </div>
                      <div>
                        <button>
                          <FaRetweet size={26} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
};

export default StreamComp;
