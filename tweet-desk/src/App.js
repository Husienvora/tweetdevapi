import React from "react";

import Sidebars from "./components/Sidebars";
import Main from "./components/Main";
import { useGlobalContext } from "./components/context";
import Login from "./components/Login";
import Loading from "./components/Loading";
function App() {
  const { aLogin, aLoading } = useGlobalContext();
  return (
    <>
      {aLoading ? (
        <Loading />
      ) : aLogin ? (
        <Login />
      ) : (
        <>
          <Sidebars />
          <Main />
        </>
      )}
    </>
  );
}

export default App;
