import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import InputIcon from "@mui/icons-material/Input";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebaseConfig.js";
import { useAuthState } from "react-firebase-hooks/auth";
import SingInWithGoogle from "../../components/singInWithGoogle.js";
import { DadosContext } from "../../context/ContextApp.js";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword, _, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const handleSingnIn = (email: string, password: string) => {
    createUserWithEmailAndPassword(email, password);
  };
  const [user] = useAuthState(auth);

  const {verifyAndCreateNewUser} = useContext(DadosContext)

  useEffect(() => {
    if (user) {
      verifyAndCreateNewUser(user);
      navigate("/login");
    }
  }, [user]);
  return (
    <div className="auth_page">
      <section className="auth_form_area">
        <div className="title_style">
          <h1>
            Crie uma conta <LoginIcon fontSize="large" />
          </h1>
          <span>Escolha uma das opções abaixo e crie uma conta!</span>
        </div>

        <form>
          <div className="form_area">
            <label htmlFor="user">Usuário</label>
            <input type="text" />
          </div>
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
          {error ? <span className="error">Email já em uso. </span> : ""}

          <span
            onClick={() => {
              handleSingnIn(email, password);
            }}
            className="button"
          >
            {loading ? (
              <DonutLargeIcon className="spin" fontSize="large" />
            ) : (
              <>
                {" "}
                Criar conta <InputIcon />
              </>
            )}
          </span>
        </form>
        <span className="desc">Ou</span>
        <SingInWithGoogle />

        <span className="desc_style">
          Ja tem uma conta ?{" "}
          <NavLink to={"/login"} className="link">
            Faça login!
          </NavLink>
        </span>
      </section>
    </div>
  );
};

export default Register;
