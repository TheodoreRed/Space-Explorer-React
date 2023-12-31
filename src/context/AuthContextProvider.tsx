import { ReactNode, useEffect, useState } from "react";
import { User } from "firebase/auth";
import AuthContext from "./AuthContext";
import { auth } from "../firebaseConfig";
import { createNewAccount, getAccountById } from "../services/accountApi";
import Account from "../models/Account";

function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    // useEffect to only register once at start -- firebase auth, method onauthsavecchanges, from google sign in
    return auth.onAuthStateChanged((newUser) => {
      setUser(newUser);
    });
  }, []);

  useEffect(() => {
    if (user) {
      getAccountById(user.uid).then((res) => {
        if (res && res._id) {
          setAccount(res);
        } else {
          //create them an account
          const newAccount: Account = {
            uid: user.uid,
            displayName: user.displayName ?? "",
            photoURL: user.photoURL ?? "",
            uniqueName: user.displayName?.split(" ")[0] + "123",
            email: user.email ?? "",
            darkMode: false,
            savedEvents: [],
            savedArticles: [],
            savedImages: [],
            comments: [],
          };
          createNewAccount(newAccount).then((r) => setAccount(r));
        }
      });
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, account, setAccount }}>
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContextProvider;
