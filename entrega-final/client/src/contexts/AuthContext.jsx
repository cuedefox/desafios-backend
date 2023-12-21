import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import tough from 'tough-cookie';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const cookieJar = new tough.CookieJar();
  const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8080/',
    jar: cookieJar,
  });

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axiosInstance.get('/api/sessions/current');
        if (response.status === 200) {
          console.log(response.data.user)
          setUser(response.data.user);
        }
      } catch (error) {
        console.error('Error al verificar la sesión actual:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [axiosInstance]);

  const login = async (email, password) => {
    try {
      const response = await axiosInstance.post('/api/sessions/login', { email, password });

      console.log(response.data)
      if (response.status === 200) {
        
        setUser(response.data.payload);
      }
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.get('/api/sessions/logout');
      setUser(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const register = async (first_name, last_name, email, age, password) => {
    try {
      await axiosInstance.post('/api/sessions/register', {
        first_name,
        last_name,
        email,
        age,
        password,
      });
    } catch (error) {
      console.error('Error de registro:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};