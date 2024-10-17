import React from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Header = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/login");
    toast.success("User logged out successfully ");
  };
  return (
    <nav
      className="navbar navbar-expand-sm  navbar-clr"
      style={{ backgroundColor: "#eef4fe", height: "50px" }}
    >
      <div className="container">
        <NavLink
          to="/home"
          className=" navbar-brand btn btn-sm fs-6 d-none d-md-block text-white fs-6"
          style={{ background: "#016efe" }}
        >
          E
        </NavLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon">
            <FaBarsStaggered className="text-white" />
          </span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link
                class="nav-link active "
                aria-current="page"
                to="/home"
                style={{ color: "#016efe", marginLeft: "100px" }}
              >
                Dashboard
              </Link>
            </li>
          </ul>
          <div className="d-flex justify-content-between align-items-center gap-3">
            <p className="pt-3" style={{ color: "#016efe" }}>
              Hello Admin !
            </p>
            {/* <Link to="/login"> */}
            <button
              className="btn btn-outline-info rounded-3"
              style={{
                borderColor: "#016efe",
                height: "35px",
                width: "80px",
                color: "#016efe",
                fontSize: "12px",
                textAlign: "center",
                padding: "0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => handleLogOut()}
            >
              Logout
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </nav>
  );
};
