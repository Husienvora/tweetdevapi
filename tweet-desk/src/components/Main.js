import React from "react";
import Streamcomp from "./StreamComp";
import UserComp from "./UserComp";
import SearchComp from "./SearchComp";
const Main = () => {
  return (
    <>
      <div class="relative bg-black h-auto top-11 grid grid-cols-3 md-1:grid-cols-1 ml-11  ">
        <Streamcomp />
        <UserComp />
        <SearchComp />
      </div>
    </>
  );
};

export default Main;
