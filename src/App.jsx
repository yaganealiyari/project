import React, { useState } from "react";
import TodoList from "./Component/TodoList";
import Auth from "./Component/Auth";
import { useContext } from "react";

export default function App() {
  const { token } = useContext(AuthContext);
  return <>{token ? <TodoList /> : <Auth />}</>;
}
