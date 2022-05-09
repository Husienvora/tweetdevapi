import React from "react";

import Sidebars from "./components/Sidebars";
import Main from "./components/Main";
import { useGlobalContext } from "./components/context";
import Login from "./components/Login";
function App() {
  const { aLogin } = useGlobalContext();
  return (
    <>
      {aLogin ? (
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
