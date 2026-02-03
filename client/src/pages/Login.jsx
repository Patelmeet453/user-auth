import { useDispatch } from "react-redux";
import { useState } from "react";
import { setUser } from "../features/auth/authSlice";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    try {
      setLoading(true);
      const res = await api.post("/auth/login", data);
      dispatch(setUser(res.data.user));
      window.location = "/profile";
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card shadow">
        <h4 className="text-center mb-4">Welcome Back 👋</h4>

        <div className="form-group mb-3">
          <label>Email</label>
          <input
            className="form-control"
            placeholder="Enter your email"
            onChange={(e) =>
              setData({ ...data, email: e.target.value })
            }
          />
        </div>

        <div className="form-group mb-3">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            placeholder="Enter your password"
            onChange={(e) =>
              setData({ ...data, password: e.target.value })
            }
          />
        </div>

        <button
          className="btn btn-primary w-100"
          disabled={loading}
          onClick={submit}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center mt-3 mb-0">
          Don’t have an account?{" "}
          <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
}
