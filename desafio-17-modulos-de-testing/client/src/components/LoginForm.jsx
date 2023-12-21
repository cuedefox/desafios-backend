import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const LoginForm = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async (e) => {
      e.preventDefault();
      login(email, password);
    };

    const handleGitHubLogin = async (e) => {
      e.preventDefault();
      window.location.href = 'http://localhost:8080/api/sessions/github';
    }

    return <>
      <h1>Login</h1>
      <div>
        <form onSubmit={handleLogin}>
          <label>
          Correo Electrónico:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Contraseña:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
      <button onClick={handleGitHubLogin}>Logueate con github</button>
      <p>No tienes una cuenta?, <a href="/register">click aqui</a></p>
    </>
}

export default LoginForm;