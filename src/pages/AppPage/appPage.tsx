import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebaseConfig";
import { useNavigate } from "react-router-dom";
import SidebarApp from "../../components/sidebarApp";
import HeaderApp from "../../components/headerApp";

const AppPage = () => {
  const navigate = useNavigate();

  const [user] = useAuthState(auth);


  
  return (
    <>
      {user ? (
        <div className="app_page">
          <div className="content">
            <SidebarApp user={user} />
            <div className="infos">
              <HeaderApp />
              <div className="content-app"></div>
            </div>
          </div>
        </div>
      ) : (
        navigate("/login")
      )}
    </>
  );
};

export default AppPage;
