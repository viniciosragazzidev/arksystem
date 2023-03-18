import React, { useEffect, useState, useContext } from "react";
import {useNavigate, NavLink } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import InputIcon from "@mui/icons-material/Input";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";

import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";






import { auth } from "../../services/firebaseConfig";

import RecoveryPasswordModal from "../../components/recoveryPasswordModal";
import { DadosContext } from "../../context/ContextApp";
import SingInWithGoogle from "../../components/singInWithGoogle";

const Login = () => {

  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const resetInputs = () => {
    setEmail("");
    setPassword("");
    console.log("reset");
  };
  const [signInWithEmailAndPassword, _, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleLogin = (email: string, password: string) => {
    signInWithEmailAndPassword(email, password);
  };

  const [user] = useAuthState(auth);

  const { openRecoverModal, setOpenRecoverModal } = useContext(DadosContext);

  return (
    <>
      {!user ? (
        <>
          <div className="auth_page">
            <RecoveryPasswordModal />
            <section className="auth_form_area">
              <div className="title_style">
                <h1>
                  Faça login <LoginIcon fontSize="large" />
                </h1>
                <span>Escolha uma das opções de login abaixo!</span>
              </div>

              <form>
                <div className="form_area">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form_area">
                  <label htmlFor="password">Senha</label>
                  <input
                    type="password"
                    value={password}
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error ? (
                  <span className="error">Email ou senha incorreto. </span>
                ) : (
                  ""
                )}
                <span
                  onClick={() => {
                    handleLogin(email, password);
                  }}
                  className="button"
                >
                  {loading ? (
                    <DonutLargeIcon className="spin" fontSize="large" />
                  ) : (
                    <>
                      {" "}
                      Entrar <InputIcon />
                    </>
                  )}
                </span>
                <span className="desc_style recovery">
                  Esqueceu a senha?{" "}
                  <span
                    onClick={() => {
                      setOpenRecoverModal(true);
                    }}
                    className="link"
                  >
                    Clique aqui
                  </span>
                </span>
              </form>
              <span className="desc">Ou</span>
              <SingInWithGoogle />
              <span className="desc_style">
                Ainda não tem uma conta ?{" "}
                <NavLink
                  to={"/register"}
                  onClick={() => {
                    resetInputs();
                  }}
                  className="link"
                >
                  Crie agora!
                </NavLink>
              </span>
            </section>
          </div>{" "}
        </>
      ) : (
        navigate("/app")
      )}
    </>
  );
};

export default Login;
