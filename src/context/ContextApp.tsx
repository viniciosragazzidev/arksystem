import { User } from "firebase/auth";
import { get, push, ref, set } from "firebase/database";
import { createContext, useState, useEffect } from "react";
////////////////////////////////
//Firebase Database Area
import { auth, db } from "../services/firebaseConfig";

import { useAuthState } from "react-firebase-hooks/auth";

////////////////////////////////

interface ContextType {
  openRecoverModal: boolean;
  setOpenRecoverModal: (openRecoverModal: boolean) => void;
  verifyAndCreateNewUser: (user: User) => void;
}

export interface SidebarAppProps {
  user: User;
}
export const DadosContext = createContext<ContextType>({
  openRecoverModal: false,
  setOpenRecoverModal: () => {},
  verifyAndCreateNewUser: () => {},
});

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [openRecoverModal, setOpenRecoverModal] = useState<boolean>(false);

  const verifyAndCreateNewUser = (user: User) => {
    const userRef = ref(db, `Users/${user.uid}`);
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        console.log("O nó com o UID do usuário já existe.");
      } else {
        set(userRef, {
          personal: {
            uid: user.uid,
            name: user.displayName,
            photoURL: user.photoURL,
            user: "",
            email: user.email,
          },
          createdAt: new Date().toISOString(),
        });
      }
    }).catch((error) => {
      console.error("Erro ao verificar se o nó com o UID do usuário existe:", error);
    });
  };
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      verifyAndCreateNewUser(user);
    }
  }, [user]);

  return (
    <DadosContext.Provider
      value={{
        openRecoverModal,
        setOpenRecoverModal,
        verifyAndCreateNewUser,
      }}
    >
      {children}
    </DadosContext.Provider>
  );
};

export default ContextProvider;
