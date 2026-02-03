import { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({});
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    try {
      setLoading(true);

      const fd = new FormData();
      Object.keys(form).forEach((k) => fd.append(k, form[k]));
      if (image) fd.append("image", image);

      await api.post("/auth/register", fd);
      window.location = "/";
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card shadow">
        <h4 className="text-center mb-4">Create Account 🚀</h4>

        <div className="form-group mb-3">
          <label>Name</label>
          <input
            className="form-control"
            placeholder="Enter your name"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </div>

        <div className="form-group mb-3">
          <label>Email</label>
          <input
            className="form-control"
            placeholder="Enter your email"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>

        <div className="form-group mb-3">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            placeholder="Create a password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>

        <div className="form-group mb-3">
          <label>Profile Image (optional)</label>
          <input
            className="form-control"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button
          className="btn btn-success w-100"
          disabled={loading}
          onClick={submit}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center mt-3 mb-0">
          Already have an account?{" "}
          <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}
