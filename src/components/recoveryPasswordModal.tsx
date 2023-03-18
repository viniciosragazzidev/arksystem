import React, { useState, useContext } from "react";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { auth } from "../services/firebaseConfig";
import { DadosContext } from "../context/ContextApp";

const RecoveryPasswordModal = () => {
  const { openRecoverModal, setOpenRecoverModal } = useContext(DadosContext);

  const [email, setEmail] = useState("");
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  const actionCodeSettings = {
    url: "http://localhost:5173/login",
  };

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (sending) {
    return <p>Sending...</p>;
  }

  const handleRecover = async () => {
    const success = await sendPasswordResetEmail(email, actionCodeSettings);
    if (success) {
      alert("Sent email");
    }
  };
  return (
    <>
      {openRecoverModal ? (
        <div className="recoveryPasswordModal">
          <div className="content">
            <span className="closeIcon">
              <span onClick={()=>{setOpenRecoverModal(false)}}>
                <CloseIcon />
              </span>
            </span>
            <div className="title_style">
              <h1>Recupere sua senha</h1>
              <span>
                Digite seu email abaixo para receber um link de recuperação
              </span>
            </div>
            <form>
              <div className="form_area">
                <label htmlFor="email-recover">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <span
                onClick={() => {
                  handleRecover();
                }}
                className="button"
              >
                Enviar <SendIcon />
              </span>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default RecoveryPasswordModal;
