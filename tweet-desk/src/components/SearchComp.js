import React from "react";
import { FaRetweet } from "react-icons/fa";
import { FcLike } from "react-icons/fc";

const SearchComp = () => {
  return (
    <>
      <div class=" bg-white border-l-2 md-1:order-3">
        <div id="Search" class="bg-white mx-2 h-10 flex justify center">
          <div
            class="bg-white w-full  h-7 mt-2  border-b-2 border-opacity-25 border-gray-500 text-base  text-gray-500 hover:text-black shadow-md"
            contenteditable="true"
          >
            Search a user
          </div>
        </div>
        <div class="bg-white h-10 flex justify-center">
          <button class="bg-cyan-400 border-2 mr-2 pl-5 pr-5  rounded-2xl shadow-lg hover:bg-cyan-300">
            Search
          </button>
        </div>
        <div class="bg-white mt-3 flex flex-col justify-center items-center ">
          <div class="">
            <img
              class=" block h-20 rounded-full sm:mx-0 sm:shrink-0"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2csVHl_EBoGPADSH-4tF2g6NFnhWKDp72MA&usqp=CAU"
            />
          </div>
          <div class="mt-1">@anime_dude</div>
        </div>
        <div class=" h-7 mt-2 grid grid-cols-2 ">
          <div class=" mx-4 mt-1 flex justify-center">
            <div class="">100</div>
          </div>
          <div class=" mx-4 mt-1 flex justify-center">
            <div class="">2</div>
          </div>
        </div>
        <div class=" h-8  grid grid-cols-2">
          <div class=" mx-4 mt-1 flex justify-center">
            <div>Followers</div>
          </div>
          <div class=" mx-4 mt-1 flex justify-center">
            <div>Following</div>
          </div>
        </div>
        <div class="flex justify-center mb-2 mt-2">
          <button class="bg-cyan-400 border-2 mr-2 pl-5 pr-5  rounded-2xl shadow-lg hover:bg-cyan-300">
            Follow
          </button>
        </div>

        <div class="  h-h-97 overflow-auto rounded-md  ">
          <div class="  relative h-auto  mx-3 mt-1 shadow-2xl g bg-white flex flex-col overflow-auto ">
            <div class="">
              <div class=" font-thin border-y-8 rounded-xl  border-b-2">
                <div>author-id:108252113</div>
                <div>tweet-id:1521064138046197760</div>
                <div>
                  #AskVir Love to do one, hopefully soon. @SidSaysShitt
                  @NetflixIsAJoke https://t.co/9iOi9YSxZp
                  https://t.co/MwZZ3kxEH0{" "}
                </div>
              </div>
              <div class="flex justify-evenly ">
                <div>
                  <button className="">
                    <FcLike size={29} />
                  </button>
                </div>
                <div>
                  <button className="">
                    <FaRetweet size={30} />
                  </button>
                </div>
              </div>
            </div>
            <div class="">
              <div class=" font-thin border-y-8 rounded-xl  border-b-2">
                <div>author-id:108252113</div>
                <div>tweet-id:1521064138046197760</div>
                <div>
                  #AskVir Love to do one, hopefully soon. @SidSaysShitt
                  @NetflixIsAJoke https://t.co/9iOi9YSxZp
                  https://t.co/MwZZ3kxEH0{" "}
                </div>
              </div>
              <div class="flex justify-evenly ">
                <div>
                  <button className="">
                    <FcLike size={29} />
                  </button>
                </div>
                <div>
                  <button className="">
                    <FaRetweet size={30} />
                  </button>
                </div>
              </div>
            </div>
            <div class="">
              <div class=" font-thin border-y-8 rounded-xl  border-b-2">
                <div>author-id:108252113</div>
                <div>tweet-id:1521064138046197760</div>
                <div>
                  #AskVir Love to do one, hopefully soon. @SidSaysShitt
                  @NetflixIsAJoke https://t.co/9iOi9YSxZp
                  https://t.co/MwZZ3kxEH0{" "}
                </div>
              </div>
              <div class="flex justify-evenly ">
                <div>
                  <button className="">
                    <FcLike size={29} />
                  </button>
                </div>
                <div>
                  <button className="">
                    <FaRetweet size={30} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchComp;
