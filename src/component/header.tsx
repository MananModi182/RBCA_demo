import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./login";
import { AuthContext } from "../store/authcontext";

const Header = () => {
  const [activeModal, setActiveModal] = useState<"login" | null>(null);

  const { isLoggedIn, logout } = useContext(AuthContext);

  const openLoginModal = () => setActiveModal("login");
  const handleClose = () => setActiveModal(null);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="p-3 bg-dark text-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li className="nav-item">
              <Link to="/" className="nav-link px-2 text-white">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/userList" className="nav-link px-2 text-white">
                User Listing
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/roleList" className="nav-link px-2 text-white">
                Role Listing
              </Link>
            </li>
          </ul>

          <div className="text-end">
            {isLoggedIn ? (
              <button
                type="button"
                className="btn btn-outline-light me-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-outline-light me-2"
                onClick={openLoginModal}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>

      {activeModal === "login" && (
        <LoginForm isVisible={activeModal === "login"} onClose={handleClose} />
      )}
    </header>
  );
};

export default Header;
