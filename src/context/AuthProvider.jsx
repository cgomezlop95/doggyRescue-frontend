import { createContext } from "react";
import { isUserLoggedIn } from "../service/auth";
import { useQuery } from "@tanstack/react-query";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: isUserLoggedIn,
    retry: 1, //or false or 1
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <AuthContext.Provider value={{ currentUser: data?.user }}>
      {children}
    </AuthContext.Provider>
  );
};
