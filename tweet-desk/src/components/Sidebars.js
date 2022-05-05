import React from "react";

const sidebars = () => {
  return (
    <>
      <div class="fixed top-11 h-screen w-11 bg-gray-300 "></div>
      <div class="fixed h-11 w-screen bg-gray-300 ">
        <div class="flex justify-start py-1  flex-nowrap w-auto ">
          <div class="mx-1">
            <button>
              <img
                class="mx-auto h-9 rounded-full hover:ring-4  sm:mx-0 sm:shrink-0"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2WWJEImdtBVeLhMDBgSTAfvvju5KltNqo2A&usqp=CAU"
                alt="Woman's Face"
              />
            </button>
          </div>
          <div class="mx-1">
            <button>
              <img
                class="mx-auto  h-9 rounded-full  hover:ring-4 sm:mx-0 sm:shrink-0"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC3I7gds6qoPcD7eNTdWNaYAYttpVqJLQKjw&usqp=CAU"
                alt="Woman's Face"
              />
            </button>
          </div>
          <div class="mx-1">
            <button class="">
              <img
                class="mx-auto h-9 rounded-full hover:ring-4 m:mx-0 sm:shrink-0"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKDeYkGVyoE3xtyrVRiAzl20Xc8nR6bvVngw&usqp=CAU"
                alt="Woman's Face"
              />
            </button>
          </div>
          <div class="mx-1">
            <button>
              <img
                class="mx-auto relative top-1 h-7 rounded-full sm:mx-0 sm:shrink-0"
                src="https://cdn-icons-png.flaticon.com/512/1828/1828926.png"
                alt="Woman's Face"
              />
            </button>
          </div>
        </div>
        <div class=" -z-20 flex justify-center relative bottom-10 space-x-1 ">
          <div>
            <img
              class="h-6"
              src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
            ></img>
          </div>
          <div>TweetDesk</div>
        </div>
        <div class="-z-10 flex justify-end relative bottom-16 right-3">
          About project
        </div>
      </div>
    </>
  );
};

export default sidebars;
