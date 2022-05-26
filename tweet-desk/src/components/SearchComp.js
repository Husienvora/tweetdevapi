import React, { useRef, useState } from "react";
import { FaRetweet } from "react-icons/fa";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { useGlobalContext } from "./context";
import Heart from "react-animated-heart";
import "../index.css";
import axios from "axios";
const SearchComp = () => {
  const search = useRef();
  const [Url, setUrl] = useState();
  const [TempFollower, setTempFollower] = useState();
  const [TempFollowing, setTempFollowing] = useState();
  const [Tweets, setTweets] = useState([]);
  const { BaseUrl, Like_a_Tweet, Retweet, Undo_a_like, Undo_Retweet } =
    useGlobalContext();
  const [Searched, setSearched] = useState(false);
  const [isClick, setClick] = useState(false);
  const [Templike, setTemplike] = useState([]);
  const [Tempretweet, setTempretweet] = useState([]);
  const id = useRef();
  const getUser = async (user) => {
    let Userdata = await axios
      .post(BaseUrl + "/twitter/finduser", {
        username: user,
      })
      .then((res) => {
        return res.data;
      });
    let tweets = await axios
      .post(BaseUrl + "/twitter/usertimeline", {
        userID: String(Userdata["data"][0]["id"]),
      })
      .then((res) => {
        return res.data;
      });

    let url = await axios
      .post(BaseUrl + "/twitter/user-photo", {
        twitterUsername: user,
      })
      .then((res) => {
        return res.data;
      });
    let following = await axios
      .post(BaseUrl + "/twitter/follow/following", {
        userId: String(Userdata["data"][0]["id"]),
      })
      .then((res) => {
        return res.data;
      });
    let follower = await axios
      .post(BaseUrl + "/twitter/getnoof", {
        userID: user,
      })
      .then((res) => {
        return res.data;
      });

    setUrl(url);

    setTempFollower(follower);
    setTempFollowing(following);
    setTweets(tweets);
    setSearched(true);
  };

  return (
    <>
      <div className=" bg-white border-l-2 md-1:order-3">
        <div
          id="Search"
          className="bg-white mx-2 h-10 flex justify center"
          spellCheck={false}
        >
          <div
            className="bg-white w-full  h-7 mt-2  border-b-2 border-opacity-25 border-gray-500 text-base  text-gray-500 hover:text-black shadow-md"
            contentEditable="true"
            suppressContentEditableWarning={true}
            ref={search}
            spellCheck="false"
          >
            Search a user
          </div>
        </div>
        <div className="bg-white h-10 flex justify-center">
          <button
            className="bg-cyan-400 border-2 mr-2 pl-5 pr-5  rounded-2xl shadow-lg hover:bg-cyan-300"
            onClick={() => {
              getUser(search.current.innerHTML);
              setSearched(false);
            }}
          >
            Search
          </button>
        </div>
        {Searched ? (
          <div>
            <div className="bg-white mt-3 flex flex-col justify-center items-center ">
              <div className="">
                <img
                  className=" block h-20 rounded-full sm:mx-0 sm:shrink-0"
                  src={Url}
                />
              </div>
              <div className="mt-1">@{search.current.innerHTML}</div>
            </div>
            <div className=" h-7 mt-2 grid grid-cols-2 ">
              <div className=" mx-4 mt-1 flex justify-center">
                <div className="">
                  {TempFollower ? (
                    TempFollower[0]["formatted_followers_count"].replace(
                      "followers",
                      ""
                    )
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
              <div className=" mx-4 mt-1 flex justify-center">
                <div className="">
                  {TempFollowing ? TempFollowing.length : <div></div>}
                </div>
              </div>
            </div>
            <div className=" h-8  grid grid-cols-2">
              <div className=" mx-4 mt-1 flex justify-center">
                <div>{TempFollower ? "Followers" : <div></div>}</div>
              </div>
              <div className=" mx-4 mt-1 flex justify-center">
                <div>{TempFollowing ? "Following" : <div></div>}</div>
              </div>
            </div>
            <div className="flex justify-center mb-2 mt-2">
              <button className="bg-cyan-400 border-2 mr-2 pl-5 pr-5  rounded-2xl shadow-lg hover:bg-cyan-300">
                Follow
              </button>
            </div>

            <div className="  h-h-97 overflow-auto rounded-md  ">
              <div className="  relative h-auto  mx-3 mt-1 shadow-2xl g bg-white flex flex-col overflow-auto ">
                {Tweets.length != 0 ? (
                  Tweets.map((tweet) => {
                    return (
                      <div className="" key={tweet.id}>
                        <div className=" font-thin border-y-8 rounded-xl  border-b-2">
                          <div>author-id:{tweet.author_id}</div>
                          <div ref={id}>tweet-id:{tweet.id}</div>
                          <div>{tweet.text}</div>
                        </div>
                        <div className="flex justify-evenly ">
                          <div className="">
                            {Templike.includes(tweet.id) ? (
                              <button
                                onClick={() => {
                                  Undo_a_like(tweet.id);
                                  let filteredArray = Templike.filter(
                                    (item) => item !== tweet.id
                                  );
                                  setTemplike(filteredArray);
                                }}
                              >
                                <FcLike size={30} />
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  Like_a_Tweet(tweet.id);
                                  setTemplike((oldarr) => [
                                    ...oldarr,
                                    tweet.id,
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
                            {Tempretweet.includes(tweet.id) ? (
                              <button
                                onClick={() => {
                                  Undo_Retweet(tweet.id);
                                  setTempretweet((oldarr) => [
                                    ...oldarr,
                                    tweet.id,
                                  ]);
                                }}
                              >
                                <FaRetweet size={30} />
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  Retweet(tweet.id);

                                  let filteredArray = Templike.filter(
                                    (item) => item !== tweet.id
                                  );
                                  setTempretweet(filteredArray);
                                }}
                              >
                                <FaRetweet size={30} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div>No tweets yet</div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default SearchComp;
