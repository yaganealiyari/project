import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function Auth({ handleToken }) {
  const [pageType, setPageType] = useState("login");
  const handlePageType = () => {
    setPageType(pageType === "login" ? "register" : "login");
  };
  return (
    <>
      {pageType === "login" ? (
        <Login handleToken={handleToken} handlePageType={handlePageType} />
      ) : (
        <Register handlePageType={handlePageType} />
      )}
    </>
  );
}
