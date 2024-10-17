import React, { useState } from "react";
import "./Sidebar.css";
import { BsPersonCircle } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { FcDepartment } from "react-icons/fc";
import { FcManager } from "react-icons/fc";
import { FaChevronDown } from "react-icons/fa";

export const Sidebar = () => {
  const [isDepartmentOpen, setIsDepartmentOpen] = useState(false);
  const [isEmployeeOpen, setIsEmployeeOpen] = useState(false);

  return (
    <div className="sidebar" style={{ marginTop: "50px" }}>
      <div className="sidebar-header">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <BsPersonCircle style={{ height: "35px", width: "35px" }} />
          </div>
          <div className="pe-4">
            <h5 className="sidebar-title" style={{ color: "white" }}>
              Administrator
            </h5>
            <div className="d-flex justify-content- align-items-center gap-2">
              <div className="circle"> </div>
              <div className="text-white">Online</div>
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar-body">
        <ul className="list-unstyled" style={{ paddingLeft: "15px" }}>
          <li className="sidebar-item mb-4 pt-4">
            <NavLink
              to="/dashboard"
              className="text-white"
              style={{ textDecoration: "none" }}
            >
              <div className="d-flex gap-3">
                <AiOutlineDashboard style={{ height: "25px", width: "25px" }} />
                Dashboard
              </div>
            </NavLink>
          </li>

          <li className="sidebar-item mb-4">
            <div
              className="d-flex gap-3 text-white"
              style={{ cursor: "pointer" }}
              onClick={() => setIsDepartmentOpen(!isDepartmentOpen)}
            >
              <FcDepartment style={{ height: "25px", width: "25px" }} />
              Department
              <FaChevronDown
                style={{
                  marginLeft: "auto",
                  transform: isDepartmentOpen
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                }}
              />
            </div>
            {isDepartmentOpen && (
              <ul className="list-unstyled ms-5 mt-2">
                <li className="sidebar-sub-item mb-2">
                  <NavLink
                    to="/department"
                    className="text-white"
                    style={{ textDecoration: "none" }}
                  >
                    Add Department
                  </NavLink>
                </li>
                <li className="sidebar-sub-item">
                  <NavLink
                    to="/departmentInfo"
                    className="text-white"
                    style={{ textDecoration: "none" }}
                  >
                    Manage Department
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          <li className="sidebar-item mb-4">
            <div
              className="d-flex gap-3 text-white"
              style={{ cursor: "pointer" }}
              onClick={() => setIsEmployeeOpen(!isEmployeeOpen)}
            >
              <FcManager style={{ height: "25px", width: "25px" }} />
              Employee
              <FaChevronDown
                style={{
                  marginLeft: "auto",
                  transform: isEmployeeOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </div>
            {isEmployeeOpen && (
              <ul className="list-unstyled ms-5 mt-2">
                <li className="sidebar-sub-item mb-2">
                  <NavLink
                    to="/employee"
                    className="text-white"
                    style={{ textDecoration: "none" }}
                  >
                    Add Employee
                  </NavLink>
                </li>
                <li className="sidebar-sub-item">
                  <NavLink
                    to="/employeeInfo"
                    className="text-white"
                    style={{ textDecoration: "none" }}
                  >
                    Manage Employee
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};
