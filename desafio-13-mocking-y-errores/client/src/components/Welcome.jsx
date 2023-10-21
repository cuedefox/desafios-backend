import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";

const Welcome = ({ user }) => {
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  return (
    <div className="welcome-products-user">
      <h2>Bienvenido {user?.name}</h2>
      <div>
        {user?.admin ? <button>Admin Menu</button> : null}
        <button>Ver Perfil</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Welcome;
