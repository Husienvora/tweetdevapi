import React, { useEffect, useState, useRef } from "react";
import { FaRetweet } from "react-icons/fa";
import "../index.css";
import LoadingBar from "react-top-loading-bar";
import { BsArrowDownCircle } from "react-icons/bs";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { useGlobalContext } from "./context";
const StreamComp = () => {
  const {
    Stream,
    Streamcache,
    setStreamcache,
    Like_a_Tweet,
    Retweet,
    Undo_a_like,
    Undo_Retweet,
    cookies,
    setCookie,
    Filtered_Stream,
    Loading,
  } = useGlobalContext();
  const [Templike, setTemplike] = useState([]);
  const [Tempretweet, setTempretweet] = useState([]);
  const [Flag, setFlag] = useState(false);
  const [Flag2, setFlag2] = useState(false);
  const placeholder = [1, 2, 3, 4];
  useEffect(() => {
    Loading.current.continuousStart();
    Filtered_Stream(eval(cookies.streamval));
  }, [Flag2]);

  // setInterval(() => {
  //   Filtered_Stream(eval(cookies.streamval));
  // }, 60000);

  const boxRef = useRef(null);
  const value = useRef(null);
  const tag = useRef(null);
  const Filterbutton = (str1) => {
    var _div = document.getElementById("filter");
    _div.style.visibility = str1;

    var parentPosition = boxRef.current.getBoundingClientRect().left;
    console.log(parentPosition);
    _div.style.left = parentPosition - 150 + "px";
    console.log(_div.style.left);
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      Filterbutton("hidden");
      setFlag(false);
    });
  }, []);

  const Changefilter = (value, tag) => {
    setCookie("streamval", `{"value":" ${value}", "tag": "${tag}"}`, {
      path: "/",
    });
    setFlag2(!Flag2);
  };
  // useEffect(() => {
  //   Loading.current.complete();
  // });

  return (
    <>
      <div className="bg-white border-r-2 md-1:order-2">
        <LoadingBar color="#00FFFF" ref={Loading} />
        <div className="flex  justify-center mt-3">
          <button
            className="bg-cyan-400 pl-5 pr-5 pt-2 pb-2 mt-3 rounded-2xl border-2 hover:shadow-lg hover:bg-cyan-300"
            onClick={() => {
              if (Flag == true) {
                Filterbutton("hidden");
                setFlag(false);
              } else {
                Filterbutton("visible");
                setFlag(true);
              }
            }}
            ref={boxRef}
          >
            Filter
          </button>
        </div>

        <div
          id="filter"
          className="h-12
          bg-white rounded-xl border-2 border-gray-400 "
        >
          <div className="mx-2 mt-2 h-44 bg-white grid grid-rows-3 ">
            <div
              contentEditable="true"
              suppressContentEditableWarning={true}
              spellCheck="false"
              className="bg-white  w-64 h-7 mt-2 mx-3 border-b-2 border-opacity-25 border-gray-500 text-xl text-gray-500 hover:text-black shadow-md"
              ref={value}
            >
              Value
            </div>

            <div
              contentEditable="true"
              suppressContentEditableWarning={true}
              spellCheck="false"
              className="bg-white mt-2 w-64 h-7  mx-3 border-b-2 border-opacity-25 border-gray-500 text-xl text-gray-500 hover:text-black shadow-md"
              ref={tag}
            >
              Tag
            </div>
            <div className="bg-white flex flex-row justify-center">
              <button
                className="w-32  mt-2 mb-2 rounded-2xl shadow-lg hover:bg-cyan-300 bg-cyan-400 "
                onClick={() => {
                  Changefilter(
                    value.current.innerHTML + " " + "has:media",
                    tag.current.innerHTML
                  );
                  Filterbutton("hidden");
                }}
              >
                Filter
              </button>
            </div>
          </div>
        </div>

        <div class="bg-white border-r-2 md-1:order-2">
          <div class="   max-h-full overflow-auto rounded-md  ">
            {Streamcache.length === 0 ? (
              <div className=" relative mt-4 ml-3 mr-3 mb-3  justify-center h-40 rounded-md animate-pulse  border-4 border-gray-400">
                No tweets on this topic in real time
              </div>
            ) : (
              Streamcache.map((obj) => {
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

                        {obj.includes.media ? (
                          obj.includes.media.map((media) => {
                            if (media.type == "photo") {
                              return (
                                <div
                                  key={media.media_key}
                                  className="h-auto mx-10 mb-3 w-auto border-4 border-gray-500"
                                >
                                  <img src={media.url}></img>
                                </div>
                              );
                            } else if (media.type == "video") {
                              return (
                                <div
                                  key={media.media_key}
                                  className="h-auto mx-10 mb-3 w-auto border-4 border-gray-500 container"
                                >
                                  <img src={media.preview_image_url}></img>
                                  <button
                                    className="imgbutton bg-cyan-400 hover:bg-cyan-300"
                                    onClick={() => {
                                      window.open(
                                        `https://twitter.com/${obj.data.author_id}/status/${obj.data.id}`,
                                        "_blank",
                                        "noopener,noreferrer"
                                      );
                                    }}
                                  >
                                    Go to video
                                  </button>
                                </div>
                              );
                            } else if (media.type == "animated_gif") {
                              let strur = media.preview_image_url.replace(
                                "https://pbs.twimg.com/tweet_video_thumb/",
                                ""
                              );
                              strur = strur.replace(".jpg", "");

                              return (
                                <div
                                  key={media.media_key}
                                  className="h-auto mx-10 mb-3 w-auto border-4 border-gray-500 container"
                                >
                                  <img src={media.preview_image_url}></img>
                                  <button
                                    className="imgbutton bg-cyan-400 hover:bg-cyan-300 mx-10"
                                    onClick={() => {
                                      window.open(
                                        `https://video.twimg.com/tweet_video/${strur}.mp4`,
                                        "_blank",
                                        "noopener,noreferrer"
                                      );
                                    }}
                                  >
                                    Go to GIF
                                  </button>
                                </div>
                              );
                            }
                          })
                        ) : (
                          <div></div>
                        )}
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
              })
            )}
          </div>
        </div>
        <div className="flex  justify-center mt-3">
          <button
            className="h-auto w-auto  mb-10"
            onClick={() => {
              console.log(cookies.streamval);
              window.scrollTo(0, 0);
              Loading.current.continuousStart();
              Filtered_Stream(eval(cookies.streamval));
            }}
          >
            <BsArrowDownCircle size={30} />
          </button>
        </div>
      </div>
    </>
  );
};

export default StreamComp;
