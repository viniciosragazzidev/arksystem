import { useState } from "react";
import { Outlet } from "react-router-dom";
import ContextProvider from "./context/ContextApp";
import "./styles/global.css";

function App() {
  return (
    <ContextProvider>
      <Outlet />
    </ContextProvider>
  );
}

export default App;
