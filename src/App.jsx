import React, { useState } from "react";

export default function App() {
  const tk = localStorage.getItem("auth");
  const [token, setToken] = useState(tk);
  const handleToken = (tkn) => {
    if (tkn) {
      localStorage.setItem("token", tkn);
    } else {
      localStorage.removeItem("token");
    }
    setToken(tkn);
  };
  return <>{token ? <TodoList /> : <Auth />}</>;
}
