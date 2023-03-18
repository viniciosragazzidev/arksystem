import React, { useContext, useEffect} from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import GoogleIcon from "@mui/icons-material/Google";
import { auth } from "../services/firebaseConfig";
import { DadosContext } from "../context/ContextApp";
import { useAuthState } from "react-firebase-hooks/auth";

const SingInWithGoogle = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const { verifyAndCreateNewUser } = useContext(DadosContext);
  const [user] = useAuthState(auth);

  const handleLoginGoogle = () => {
    signInWithGoogle();
    if (user) {
      verifyAndCreateNewUser(user);
    }
  };




  return (
    <div
      className="auth_button_google"
      onClick={() => {
        handleLoginGoogle();
      }}
    >
      <GoogleIcon /> Entre com uma conta google
    </div>
  );
};

export default SingInWithGoogle;
