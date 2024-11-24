import { useState } from "react";
import { Link } from "react-router-dom";
import Login from "./login";
import Signin from "./signin";

const Header = () => {
  const [activeModal, setActiveModal] = useState<"login" | "signup" | null>(
    null
  );

  // Handlers to open and close modals
  const openLoginModal = () => setActiveModal("login");
  const openSignupModal = () => setActiveModal("signup");
  const handleClose = () => setActiveModal(null);

  return (
    <header className="p-3 bg-dark text-white">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a
            href="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            <svg
              className="bi me-2"
              width="40"
              height="32"
              role="img"
              aria-label="Bootstrap"
            >
              <use xlinkHref="#bootstrap"></use>
            </svg>
          </a>

          {/* Navigation Links */}
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

          {/* Buttons */}
          <div className="text-end">
            <button
              type="button"
              className="btn btn-outline-light me-2"
              onClick={openLoginModal}
            >
              Login
            </button>
            <button
              type="button"
              className="btn btn-warning"
              onClick={openSignupModal}
            >
              Sign-up
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal === "login" && (
        <Login
          isVisible={activeModal === "login"}
          onClose={handleClose}
          onSwitch={openSignupModal}
        />
      )}
      {activeModal === "signup" && (
        <Signin
          isVisible={activeModal === "signup"}
          onClose={handleClose}
          onSwitch={openLoginModal}
        />
      )}
    </header>
  );
};

export default Header;
