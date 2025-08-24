import { useState } from "react";

function useAuth() {
  // For now, we'll simulate authentication with local state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return { isAuthenticated, login, logout };
}

export default useAuth;