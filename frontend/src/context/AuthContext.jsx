import { createContext, useEffect, useState, useCallback } from "react";
import {
  loginApi,
  signUpLearner,
  signUpInstructor,
  getMeApi
} from "../api/auth";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //  Restore session on refresh
  useEffect(() => {
    let mounted = true;

    const restoreAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getMeApi();
        if (mounted) setUser(data.profile.user);
      } catch {
        localStorage.removeItem("token");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    restoreAuth();
    return () => (mounted = false);
  }, []);

  // LOGIN
  const login = useCallback(async (credentials) => {
    const data = await loginApi(credentials);
    localStorage.setItem("token", data.data.token);
    setUser(data.user);
    return data;
  }, []);

  //  SIGNUP – LEARNER
  const signupLearner = useCallback(async (payload) => {
    const data = await signUpLearner(payload);
    localStorage.setItem("token", data.data.token);
    setUser(data.user);
  }, []);

  // SIGNUP – INSTRUCTOR
  const signupInstructor = useCallback(async (payload) => {
    const data = await signUpInstructor(payload);
    localStorage.setItem("token", data.data.token);
    setUser(data.user);
  }, []);

  // LOGOUT
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        role: user?.role,
        loading,
        login,
        signupLearner,
        signupInstructor,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
