import React,{useEffect} from "react";
import { signOut, User } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { NavLink } from "react-router-dom";
import { SidebarAppProps } from "../context/ContextApp";

const SidebarApp = ({ user }: SidebarAppProps) => {
  
  const logout = () => {
    signOut(auth);
  };
  return (
    <aside>
      <header>
        <span className="logo">
          <PointOfSaleIcon fontSize="large" /> Ark<span>System</span>
        </span>
      </header>
      <nav>
        <ul>
          <li>
            <NavLink to="/app/dashboard">
              <DashboardIcon fontSize="large" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <a href="/about">
              {" "}
              <AttachMoneyIcon fontSize="large" /> Fluxo de Caixa
            </a>
          </li>
          <li>
            <a href="/about">
              <CleaningServicesIcon fontSize="large" /> Serviços
            </a>
          </li>
        </ul>
      </nav>

      <div className="profileArea">
        <div className="profilePhoto">
          <img
            src={user.photoURL ? user.photoURL : ''}
            alt=""
          />
        </div>
        <div className="title_style">
          <h1>{user.displayName}</h1>
          <span className="profileEmail">{user.email}</span>
        </div>

        <span className="button" onClick={logout}>
          <ExitToAppIcon fontSize="large" /> <span className="name">Sair</span>
        </span>
      </div>
    </aside>
  );
};

export default SidebarApp;
