import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (!navigator.onLine) {
      setUser(null); // Clear user state if offline
      return;
    }
    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      let unsubUser = null;

      if (firebaseUser) {
        const userDocRef = doc(db, "users", firebaseUser.uid);
        unsubUser = onSnapshot(userDocRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            const events = userData?.RSVP || [];

            // Set the user data in the context
            setUser({
              uid: firebaseUser.uid,
              firstName: userData?.firstName || "",
              lastName: userData?.lastName || "",
              email: firebaseUser.email,
              events,
            });
          } else {
            setUser((userProp) => ({ ...userProp, events: [] }));
          }
        });

        return () => {
          unsubUser();
        };
      } else {
        // User is signed out, clear the user state
        setUser(null);
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
