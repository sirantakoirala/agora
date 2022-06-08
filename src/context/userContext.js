import { createContext, useState, useEffect, useContext } from "react";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut as signout,
  updatePassword,
  updateEmail,
} from "firebase/auth";
import { auth, db } from "../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";

export const UserContext = createContext();

export function UserContextProvider(props) {
  const updateUserPassword = (pwd) =>
    updatePassword(pwd);
  const updateUserEmail =(email) =>
    updateEmail(email);
  const signUp = (email, pwd) =>
    createUserWithEmailAndPassword(auth, email, pwd);
  const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd);
  const signOut = async () => await signout(auth);

  const [currentUser, setCurrentUser] = useState();
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (curUser) => {
      if (curUser) {
        console.log("AAA"+curUser.uid);

        const userRole = await getDocs(
          query(collection(db, "users"), where("uid", "==", curUser.uid))
        );
        setCurrentUser({ ...curUser,
          uid:userRole.docs[0].data().uid,
          role: userRole.docs[0].data().role,
          approval: userRole.docs[0].data().approval,
          address:userRole.docs[0].data().address,
          birthdate:userRole.docs[0].data().birthdate,
          displayname:userRole.docs[0].data().uname,
          email:userRole.docs[0].data().email,
          uname:userRole.docs[0].data().uname,
          phone:userRole.docs[0].data().phone,
          avatar: userRole.docs[0].data().avatar,
         });
        //setCurrentUser({ ...currentUser, approval: userRole.docs[0].data().approval });

      } else {
        console.log("BBB");
        setCurrentUser(curUser);
      }

      setLoadingData(false);
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={{updateUserPassword, signUp, currentUser, signIn, signOut }}>
      {!loadingData && props.children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
