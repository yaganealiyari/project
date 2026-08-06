import { Children, createContext, useState } from "react";
const AuthContext = createContext();
export default AuthContext;
export const AuthContexProvider = ({ Children }) => {
  const tk = localStorage.getItem("token");
  const [token, setToken] = useState(tk);
  const handleToken = (tkn) => {
    if (tkn) {
      localStorage.setItem("token", tkn);
    } else {
      localStorage.removeItem("token");
    }
    setToken(tkn);
  };
  return (
    <AuthContext.Provider value={{ token, handleToken }}>
      {Children}
    </AuthContext.Provider>
  );
};
