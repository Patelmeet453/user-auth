import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearUser } from "../features/auth/authSlice";
import defaultImg from "../assets/default.png";
import api from "../services/api";

export default function Navbar() {
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();

  const logout = async () => {
    await api.post("/auth/logout");
    dispatch(clearUser());
    window.location = "/";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">
        UserAuth
      </Link>

      <div className="ms-auto d-flex align-items-center gap-3">
        {!user && (
          <>
            <Link className="btn btn-outline-light" to="/">
              Login
            </Link>
            <Link className="btn btn-outline-info" to="/register">
              Register
            </Link>
          </>
        )}

        {user && (
          <>
            <button className="btn btn-sm btn-outline-light" onClick={logout}>
              Logout
            </button>
            <Link to="/profile">
              <img
                src={user.avatar || defaultImg}
                className="rounded-circle border"
                style={{
                  width: "40px",
                  height: "40px",
                  objectFit: "cover",
                }}
              />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../features/auth/authSlice";
// import { Link } from "react-router-dom";

// export default function Navbar() {
//   const { user } = useSelector((s) => s.auth);
//   const dispatch = useDispatch();

//   return (
//     <nav className="navbar navbar-dark bg-dark px-3">
//       <Link className="navbar-brand" to="/">AccountApp</Link>

//       {user && (
//         <div className="d-flex align-items-center gap-2">
//           <img
//             src={user.avatar || "https://via.placeholder.com/40"}
//             className="rounded-circle"
//             width="40"
//             height="40"
//           />
//           <button className="btn btn-sm btn-danger" onClick={()=>dispatch(logout())}>
//             Logout
//           </button>
//         </div>
//       )}
//     </nav>
//   );
// }
