import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "../services/api";
import { setUser } from "../features/auth/authSlice";
import defaultImg from "../assets/default.png";

export default function Profile() {
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);
  const [user, setUserState] = useState({});
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [hideAvatar, setHideAvatar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* FETCH PROFILE */
  useEffect(() => {
    api
      .get("/auth/profile")
      .then((res) => {
        setUserState(res.data);
        dispatch(setUser(res.data));
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  /* CLEAN PREVIEW URL */
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const updateProfile = async () => {
    try {
      setSaving(true);

      const fd = new FormData();
      fd.append("name", user.name);
      fd.append("email", user.email);
      if (image) fd.append("image", image);
      if (removeImage) fd.append("removeImage", "true");

      const res = await api.put("/auth/profile", fd);
      setUserState(res.data);
      dispatch(setUser(res.data));

      setEdit(false);
      setImage(null);
      setPreview(null);
      setRemoveImage(false);
      setHideAvatar(false);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
        <p className="mt-2">Loading profile...</p>
      </div>
    );
  }

  const profileImage =
    preview || (!hideAvatar && user.avatar) || defaultImg;

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow text-center" style={{ width: "450px" }}>
        <div className="position-relative mx-auto" style={{ width: "120px" }}>
          <img
            src={profileImage}
            alt="profile"
            className="rounded-circle"
            style={{
              width: "120px",
              height: "120px",
              objectFit: "cover",
            }}
          />

          {edit && (preview || user.avatar) && (
            <button
              className="btn btn-sm btn-danger position-absolute rounded-circle"
              style={{ top: "-5px", right: "-5px" }}
              onClick={() => {
                setPreview(null);
                setImage(null);
                setRemoveImage(true);
                setHideAvatar(true);
              }}
            >
              ✕
            </button>
          )}
        </div>

        {!edit ? (
          <>
            <h4 className="mt-3">{user.name}</h4>
            <p className="text-muted">{user.email}</p>
            <button
              className="btn btn-warning w-100"
              onClick={() => setEdit(true)}
            >
              Edit Profile
            </button>
          </>
        ) : (
          <>
            <input
              className="form-control mt-3"
              value={user.name || ""}
              onChange={(e) =>
                setUserState({ ...user, name: e.target.value })
              }
            />
            <input
              className="form-control mt-2"
              value={user.email || ""}
              onChange={(e) =>
                setUserState({ ...user, email: e.target.value })
              }
            />
            <input
              className="form-control mt-2"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImage(file);
                  setPreview(URL.createObjectURL(file));
                  setRemoveImage(false);
                  setHideAvatar(false);
                }
              }}
            />
            <div className="d-flex gap-2 mt-3">
              <button
                className="btn btn-success w-100"
                onClick={updateProfile}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                className="btn btn-secondary w-100"
                onClick={() => setEdit(false)}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
