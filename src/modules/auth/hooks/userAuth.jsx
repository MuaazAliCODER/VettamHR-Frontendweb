import { useState } from "react";
import { loginUser } from "../services/authServices";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (data, onSuccess) => {
    setLoading(true);
    setError(null);

    try {
      const res = await loginUser(data);
      if (res.success && onSuccess) {
        onSuccess(res.user);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}