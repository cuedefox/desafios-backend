import { AuthProvider } from "./contexts/AuthContext.jsx";
import Router from "./router/Router.jsx";
import "./sass/import.scss";

function App() {
  return <>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </>
}

export default App;
