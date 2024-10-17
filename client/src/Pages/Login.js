import React from "react";
import FormInput from "../component/FormInput";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Login = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home");
    toast.success("User logged in successfully ");
  };
  return (
    <>
      <div className="mx-auto d-flex justify-content-center align-items-center mt-5">
        <span className="fw-bold">Employee </span>
        <span className="text-muted"> Management</span>
      </div>

      <section
        className="w-75 mx-auto  d-flex justify-content-center align-items-center "
        style={{ marginTop: "40px" }}
      >
        <form className="shadow-lg p-4 mb-5 bg-light rounded" method="POST">
          <p className="text-center fs-6"> Please login to continue...</p>
          <FormInput
            type="email"
            label="Email"
            name="identifier"
            defaultValue="admin@admin.com"
            readOnly
          />
          <FormInput
            type="password"
            label="Password"
            name="password"
            defaultValue="admin"
            readOnly
          />
          <button
            type="button"
            className="btn btn-info btn-block mt-3"
            onClick={handleClick}
            style={{ width: "250px" }}
          >
            LOGIN
          </button>
        </form>
      </section>
    </>
  );
};
