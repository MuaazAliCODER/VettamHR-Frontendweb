import { useState } from "react";
import { loginUser } from "../services/authServices";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const res = await loginUser(data);
      console.log(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}