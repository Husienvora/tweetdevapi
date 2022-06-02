import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "./context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const UserComp = () => {
  const {
    cookies,
    Users,
    User_is_following,
    Users_followers,
    Followers,
    Following,
    Undo_Retweet,
    Retweet,
    Create_tweet,
    Delete_tweet,
    User_lookup,
    Like_a_Tweet,
    Undo_a_like,
    Follow_UserId,
    Unfollow_UserId,
    Block_a_user,
    unBlock_a_user,
    BaseUrl,
  } = useGlobalContext();

  const tweet = useRef(null);
  const retweet = useRef(null);
  const follow = useRef(null);
  const Like = useRef(null);
  const [TempFollower1, setTempFollower1] = useState();
  const block = useRef(null);
  useEffect(() => {
    if (!TempFollower1 || !Following) {
      for (let i = 1; i <= Users.length; i++) {
        if (Users[0] == eval(`cookies.User${i}.User`)) {
          User_is_following(eval(`cookies.User${i}.User_id`));

          break;
        }
      }
      const followers = async () => {
        let follower = await axios
          .post(BaseUrl + "/twitter/getnoof", {
            userID: Users[0],
          })
          .then((res) => {
            return res.data;
          });

        setTempFollower1(follower);
      };
      followers();
    }
  });

  const FollowaUser = async (user) => {
    let Userdata = await axios
      .post(BaseUrl + "/twitter/finduser", {
        username: user,
      })
      .then((res) => {
        return res.data;
      });

    Follow_UserId(String(Userdata["data"][0]["id"]));
  };
  const unFollowaUser = async (user) => {
    let Userdata = await axios
      .post(BaseUrl + "/twitter/finduser", {
        username: user,
      })
      .then((res) => {
        return res.data;
      });
    Unfollow_UserId(String(Userdata["data"][0]["id"]));
  };
  const BlockaUser = async (user) => {
    let Userdata = await axios
      .post(BaseUrl + "/twitter/finduser", {
        username: user,
      })
      .then((res) => {
        return res.data;
      });
    Block_a_user(String(Userdata["data"][0]["id"]));
  };
  const unBlockaUser = async (user) => {
    let Userdata = await axios
      .post(BaseUrl + "/twitter/finduser", {
        username: user,
      })
      .then((res) => {
        return res.data;
      });
    unBlock_a_user(String(Userdata["data"][0]["id"]));
  };

  return (
    <>
      <div className="bg-white md-1:order-1 ">
        <div className=" mt-8  flex flex-col justify-center items-center ">
          <div className="">
            <img
              className=" block h-20 rounded-full sm:mx-0 sm:shrink-0"
              src={eval(`cookies.${Users[0]}`)}
            />
          </div>
          <div className="mt-1">@{Users[0]}</div>
        </div>
        <div className=" h-7 mt-2 grid grid-cols-2 ">
          <div className=" mx-4 mt-1 flex justify-center">
            <div className="">
              {TempFollower1 ? (
                TempFollower1[0]["formatted_followers_count"].replace(
                  /followers|follower/gi,
                  ""
                )
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className=" mx-4 mt-1 flex justify-center">
            <div className="">{!Following ? "Loading" : Following.length}</div>
          </div>
        </div>
        <div className=" h-8  grid grid-cols-2">
          <div className=" mx-4 mt-1 flex justify-center">
            <div>Followers</div>
          </div>
          <div className=" mx-4 mt-1 flex justify-center">
            <div>Following</div>
          </div>
        </div>
        {/*-----tweet section---------------*/}
        <div id="tweetauser" className="bg-white h-56  flex justify-center">
          <div
            className="bg-white  w-full  h-52 mt-2 mx-2 border-b-2 border-opacity-25 border-gray-500 text-xl text-gray-500 hover:text-black shadow-md"
            contentEditable="true"
            suppressContentEditableWarning={true}
            ref={tweet}
            spellCheck="false"
          >
            Write something to tweet or write tweet-id to delete
          </div>
        </div>
        <div className="bg-white h-10 flex justify-end">
          <button
            className="bg-cyan-400 border-2 mr-2 pl-5 pr-5 rounded-2xl shadow-lg hover:bg-cyan-300"
            onClick={() => {
              Create_tweet(String(tweet.current.innerHTML));
              tweet.current.innerHTML =
                "Write something to tweet or write tweet-id to delete";
            }}
          >
            tweet
          </button>
          <button
            className="bg-cyan-400 border-2 mr-2 pl-5 pr-5 rounded-2xl shadow-lg hover:bg-cyan-300"
            onClick={() => {
              Delete_tweet(String(tweet.current.innerHTML));
              tweet.current.innerHTML =
                "Write something to tweet or write tweet-id to delete";
            }}
          >
            Delete tweet
          </button>
        </div>
        {/*-----/tweet section---------------*/}
        {/*-----retweet section---------------*/}
        <div id="retweetauser" className="bg-white h-10 flex justify center">
          <div
            className="bg-white w-full  h-7 mt-2 mx-2  border-b-2 border-opacity-25 border-gray-500 text-base  text-gray-500 hover:text-black shadow-md"
            contentEditable="true"
            ref={retweet}
            suppressContentEditableWarning={true}
            spellCheck="false"
          >
            tweet-id to retweet/undoretweet
          </div>
        </div>
        <div className="bg-white h-10 flex justify-end ">
          <button
            className="bg-cyan-400 border-2 mr-2 pl-5 pr-5  rounded-2xl shadow-lg hover:bg-cyan-300"
            onClick={() => {
              Retweet(String(retweet.current.innerHTML));
              retweet.current.innerHTML = "tweet-id to retweet/undoretweet";
            }}
          >
            retweet
          </button>
          <button
            className="bg-cyan-400 border-2 mr-2 pl-5 pr-5  whitespace-nowrap rounded-2xl shadow-lg hover:bg-cyan-300"
            onClick={() => {
              Undo_Retweet(String(retweet.current.innerHTML));
              retweet.current.innerHTML = "tweet-id to retweet/undoretweet";
            }}
          >
            Undo retweet
          </button>
        </div>

        {/*-----/retweet section---------------*/}
        {/*-----follow a user section---------------*/}
        <div id="followauser" className="bg-white h-10 flex justify center">
          <div
            className="bg-white w-full  h-7 mt-2  mx-2 border-b-2 border-opacity-25 border-gray-500 text-base  text-gray-500 hover:text-black shadow-md"
            contentEditable="true"
            suppressContentEditableWarning={true}
            ref={follow}
            spellCheck="false"
          >
            Username to follow/unfollow
          </div>
        </div>
        <div className="bg-white h-10 flex justify-end">
          <button
            className="bg-cyan-400 border-2 mr-2 pl-5 pr-5  rounded-2xl shadow-lg hover:bg-cyan-300"
            onClick={() => {
              FollowaUser(String(follow.current.innerHTML));
              follow.current.innerHTML = "Username to follow/unfollow";
            }}
          >
            follow
          </button>
          <button
            className="bg-cyan-400 border-2 mr-2 pl-5 pr-5  rounded-2xl shadow-lg hover:bg-cyan-300"
            onClick={() => {
              unFollowaUser(String(follow.current.innerHTML));
              follow.current.innerHTML = "Username to follow/unfollow";
            }}
          >
            Unfollow
          </button>
        </div>
        {/*-----/follow a user section---------------*/}
        {/*-----like a tweet section---------------*/}
        <div id="likeauser" className="bg-white h-10 flex justify center">
          <div
            className="bg-white w-full  h-7 mt-2  mx-2 border-b-2 border-opacity-25 border-gray-500 text-base  text-gray-500 hover:text-black shadow-md"
            contentEditable="true"
            suppressContentEditableWarning={true}
            ref={Like}
            spellCheck="false"
          >
            tweet id to like/unlike
          </div>
        </div>
        <div className="bg-white h-10 flex justify-end">
          <button
            className="bg-cyan-400 border-2 mr-2 pl-5 pr-5  rounded-2xl shadow-lg hover:bg-cyan-300"
            onClick={() => {
              Like_a_Tweet(String(Like.current.innerHTML));
              Like.current.innerHTML = "tweet id to like/unlike";
            }}
          >
            like
          </button>
          <button
            className="bg-cyan-400 border-2 mr-2 pl-5 pr-5  rounded-2xl shadow-lg hover:bg-cyan-300"
            onClick={() => {
              Undo_a_like(String(Like.current.innerHTML));
              Like.current.innerHTML = "tweet id to like/unlike";
            }}
          >
            Unlike
          </button>
        </div>
        {/*-----/like a tweet section---------------*/}
        {/*-----Block a user---------------*/}
        <div id="Blockauser" className="bg-white h-10 flex justify center">
          <div
            className="bg-white w-full  h-7 mt-2  mx-2 border-b-2 border-opacity-25 border-gray-500 text-base  text-gray-500 hover:text-black shadow-md"
            contentEditable="true"
            suppressContentEditableWarning={true}
            ref={block}
            spellCheck="false"
          >
            tweet id to Block/Unblock
          </div>
        </div>
        <div className="bg-white h-10 flex justify-end">
          <button
            className="bg-cyan-400 border-2 mr-2 pl-5 pr-5  rounded-2xl shadow-lg hover:bg-cyan-300"
            onClick={() => {
              BlockaUser(String(block.current.innerHTML));
              block.current.innerHTML = "tweet id to Block/Unblock";
            }}
          >
            Block
          </button>
          <button
            className="bg-cyan-400 border-2 mr-2 pl-5 pr-5  rounded-2xl shadow-lg hover:bg-cyan-300"
            onClick={() => {
              unBlockaUser(String(block.current.innerHTML));
              block.current.innerHTML = "tweet id to Block/Unblock";
            }}
          >
            Unblock
          </button>
        </div>

        {/*-----/Block a user---------------*/}
      </div>
    </>
  );
};

export default UserComp;
