import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const login = () => {
    // TODO
    setCurrentUser({
      id: "1",
      name: "Jane Doe",
      profilePic:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP4Muy_Z2IIkQznvhyZkrn-NWsnURAlW1Nq-xK4AE&s",
    });
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
