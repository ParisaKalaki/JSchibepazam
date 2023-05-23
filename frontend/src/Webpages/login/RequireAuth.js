import  useAuth  from "./useAuth"
import { Navigate } from "react-router-dom"

export default function RequireAuth({ children }) {
    const { authed } = useAuth();

  
    return authed === true ? (
      children
    ) : (
      <Navigate to="/login" replace />
    );
  }
