import React, { useEffect, useState } from "react";
import { FaRetweet } from "react-icons/fa";

import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { useGlobalContext } from "./context";
const StreamComp = () => {
  const {
    Stream,
    Streamcache,
    Like_a_Tweet,
    Retweet,
    Undo_a_like,
    Undo_Retweet,
  } = useGlobalContext();
  const [Templike, setTemplike] = useState([]);
  const [Tempretweet, setTempretweet] = useState([]);
  const placeholder = [1, 2, 3, 4];
  useEffect(() => {
    if (Streamcache.length == 0) {
      Stream();
    }
  }, []);
  setInterval(() => {
    Stream();
  }, 30000);

  return (
    <>
      <div className="bg-white border-r-2 md-1:order-2">
        <div className="flex  justify-center mt-3">
          <button className="bg-cyan-400 pl-5 pr-5 pt-2 pb-2 mt-3 rounded-2xl border-2 hover:shadow-lg hover:bg-cyan-300">
            Filter
          </button>
        </div>
        <div class="bg-white border-r-2 md-1:order-2">
          <div class="   max-h-full overflow-auto rounded-md  ">
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
              : Streamcache.map((obj) => {
                  return (
                    <div
                      key={obj.data.id}
                      class="  relative h-auto  mx-3 mt-1 shadow-2xl g bg-white flex flex-col  "
                    >
                      <div class="">
                        <div class=" font-thin border-y-8 rounded-xl h-auto border-b-2">
                          <div>author-id:{obj.data.author_id}</div>
                          <div>tweet-id:{obj.data.id}</div>
                          <div>{obj.data.text}</div>

                          {obj.includes.media.map((media) => {
                            return (
                              <div
                                key={media.url}
                                className="h-auto mx-10 mb-3 w-auto border-4 border-gray-500"
                              >
                                <img src={media.url}></img>
                              </div>
                            );
                          })}
                        </div>
                        <div className="flex justify-evenly ">
                          <div className="">
                            {Templike.includes(obj.data.id) ? (
                              <button
                                onClick={() => {
                                  Undo_a_like(obj.data.id);
                                  let filteredArray = Templike.filter(
                                    (item) => item !== obj.data.id
                                  );
                                  setTemplike(filteredArray);
                                }}
                              >
                                <FcLike size={30} />
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  Like_a_Tweet(obj.data.id);
                                  setTemplike((oldarr) => [
                                    ...oldarr,
                                    obj.data.id,
                                  ]);
                                }}
                              >
                                <FcLikePlaceholder size={30} />
                              </button>
                            )}

                            {/* <Heart
                              isClick={
                                Templike.includes(tweet.id) ? true : false
                              }
                              onClick={() => {
                                Like_a_Tweet(tweet.id);
                                setTemplike((oldarr) => [...oldarr, tweet.id]);
                              }}
                              styles="height:100vw"
                            /> */}
                          </div>
                          <div>
                            {Tempretweet.includes(obj.data.id) ? (
                              <button
                                onClick={() => {
                                  Undo_Retweet(obj.data.id);

                                  let filteredArray = Templike.filter(
                                    (item) => item !== obj.data.id
                                  );
                                  setTempretweet(filteredArray);
                                }}
                              >
                                <FaRetweet size={30} />
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  Retweet(obj.data.id);
                                  setTempretweet((oldarr) => [
                                    ...oldarr,
                                    obj.data.id,
                                  ]);
                                }}
                              >
                                <FaRetweet size={30} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </>
  );
};

export default StreamComp;
