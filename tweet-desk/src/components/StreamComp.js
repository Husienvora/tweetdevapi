import React from "react";
import { FaRetweet } from "react-icons/fa";
import { FcLike } from "react-icons/fc";

const streamComp = () => {
  return (
    <>
      <div className="bg-white border-r-2 md-1:order-2">
        <div className="flex  justify-center mt-3">
          <button className="bg-cyan-400 pl-5 pr-5 pt-2 pb-2 mt-3 rounded-2xl border-2 hover:shadow-lg hover:bg-cyan-300">
            Filter
          </button>
        </div>
        <div className="relative grid grid-rows-3">
          <div className=" relative mt-4 ml-3 mr-3 mb-3  h-40 rounded-md  border-4 border-gray-400  overflow-auto"></div>
          <div className=" relative mt-4 ml-3 mr-3 mb-3  h-40 rounded-md   border-4 border-gray-400">
            <div className="bg-white border-b-2 border-gray-300 h-32 mx-2 font-thin overflow-auto">
              <div>tweet_id:1521741495010619393</div>
              <div>
                This kindness is disconcerting ,” she managed. “Whatever turmoil
                exists in my heart, I deserve it.
              </div>
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
          <div className=" relative mt-4 ml-3 mr-3 mb-3  h-40 rounded-md   border-4 border-gray-400 overflow-auto"></div>
          <div className=" relative mt-4 ml-3 mr-3 mb-3  h-40 rounded-md border-4 border-gray-400 overflow-auto "></div>
        </div>
      </div>
    </>
  );
};

export default streamComp;
