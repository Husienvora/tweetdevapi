import React from "react";

const userComp = () => {
  return (
    <>
      {/*--User--*/}

      <div className="bg-white md-1:order-1 ">
        <div className=" mt-8  flex flex-col justify-center items-center ">
          <div className="">
            <img
              className=" block h-20 rounded-full sm:mx-0 sm:shrink-0"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2WWJEImdtBVeLhMDBgSTAfvvju5KltNqo2A&usqp=CAU"
            />
          </div>
          <div className="mt-1">@Husien_vora</div>
        </div>
        <div className=" h-7 mt-2 grid grid-cols-2 ">
          <div className=" mx-4 mt-1 flex justify-center">
            <div className="">100</div>
          </div>
          <div className=" mx-4 mt-1 flex justify-center">
            <div className="">2</div>
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
          >
            Write something to tweet or write tweet-id to delete
          </div>
        </div>
        <div className="bg-white h-10 flex justify-end">
          <button className="bg-cyan-400 border-2 mr-2 pl-5 pr-5 rounded-2xl shadow-lg hover:bg-cyan-300">
            tweet
          </button>
          <button className="bg-cyan-400 border-2 mr-2 pl-5 pr-5 rounded-2xl shadow-lg hover:bg-cyan-300">
            Delete tweet
          </button>
        </div>
        {/*-----/tweet section---------------*/}
        {/*-----retweet section---------------*/}
        <div id="retweetauser" className="bg-white h-10 flex justify center">
          <div
            className="bg-white w-full  h-7 mt-2 mx-2  border-b-2 border-opacity-25 border-gray-500 text-base  text-gray-500 hover:text-black shadow-md"
            contentEditable="true"
            suppressContentEditableWarning={true}
          >
            tweet-id to retweet/undoretweet
          </div>
        </div>
        <div className="bg-white h-10 flex justify-end ">
          <button className="bg-cyan-400 border-2 mr-2 pl-5 pr-5  rounded-2xl shadow-lg hover:bg-cyan-300">
            retweet
          </button>
          <button className="bg-cyan-400 border-2 mr-2 pl-5 pr-5  whitespace-nowrap rounded-2xl shadow-lg hover:bg-cyan-300">
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
          >
            Username to follow/unfollow
          </div>
        </div>
        <div className="bg-white h-10 flex justify-end">
          <button className="bg-cyan-400 border-2 mr-2 pl-5 pr-5  rounded-2xl shadow-lg hover:bg-cyan-300">
            follow
          </button>
          <button className="bg-cyan-400 border-2 mr-2 pl-5 pr-5  rounded-2xl shadow-lg hover:bg-cyan-300">
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
          >
            tweet id to like/unlike
          </div>
        </div>
        <div className="bg-white h-10 flex justify-end">
          <button className="bg-cyan-400 border-2 mr-2 pl-5 pr-5  rounded-2xl shadow-lg hover:bg-cyan-300">
            like
          </button>
          <button className="bg-cyan-400 border-2 mr-2 pl-5 pr-5  rounded-2xl shadow-lg hover:bg-cyan-300">
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
          >
            tweet id to Block/Unblock
          </div>
        </div>
        <div className="bg-white h-10 flex justify-end">
          <button className="bg-cyan-400 border-2 mr-2 pl-5 pr-5  rounded-2xl shadow-lg hover:bg-cyan-300">
            Block
          </button>
          <button className="bg-cyan-400 border-2 mr-2 pl-5 pr-5  rounded-2xl shadow-lg hover:bg-cyan-300">
            Unblock
          </button>
        </div>

        {/*-----/Block a user---------------*/}
      </div>
    </>
  );
};

export default userComp;
