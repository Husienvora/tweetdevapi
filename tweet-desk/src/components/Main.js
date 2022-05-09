import React from "react";
import Streamcomp from "./StreamComp";
import UserComp from "./UserComp";
import SearchComp from "./SearchComp";
import { useGlobalContext } from "./context";
import Login from "./Login";
const Main = () => {
  const { aLogin } = useGlobalContext();
  return (
    <>
      <div className="relative bg-black h-auto top-11 grid grid-cols-3 md-1:grid-cols-1 ml-11  ">
        <Streamcomp />
        <UserComp />
        <SearchComp />
      </div>
    </>
  );
};

export default Main;
