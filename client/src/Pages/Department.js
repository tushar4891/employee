import React, { useState } from "react";
import { Header } from "../component/Header";
import { SetDepartmentData } from "../apiCalls/allDepartment";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Department = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  // Handle adding department
  const handleAddDepartment = async () => {
    if (!departmentName || !description) {
      toast.success("Department name and description are required");
      return;
    }
    const departmentData = {
      name: departmentName,
      description: description,
    };
    try {
      const response = await SetDepartmentData(departmentData);
      if (response.success) {
        setDepartmentName("");
        setDescription("");
        toast.success(response.message);
      } else {
        toast.success(response.message);
      }
    } catch (error) {
      toast.success(error);
    }
  };

  const handleCancel = () => {
    navigate("/home");
  };

  return (
    <>
      <Header />
      <h4 className="pt-3 px-3">Departments</h4>
      <hr
        class=" border-bottom mt-3"
        style={{ width: "93%", marginTop: "-15px", marginLeft: "20px" }}
      />
      <div
        className="container d-flex justify-content-center align-items-center shadow-4"
        style={{
          width: "600px",
          height: "400px",
          //   padding: "20px",
        }}
      >
        <div className="col-md-10">
          <div className="row">
            <div>
              <h6> Department Name</h6>
              <input
                type="text"
                style={{ width: "100%" }}
                value={departmentName} // Bind input to state
                onChange={(e) => setDepartmentName(e.target.value)} // Update state on change
                onFocus={(e) => {
                  e.target.style.outline = "none";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
            <div className="pt-4">
              <h6> Description</h6>
              <textarea
                type="text"
                style={{
                  height: "100px",
                  width: "100%",
                  resize: "none", // Prevent resizing if needed
                  border: "1px solid #ccc", // Light border
                  padding: "8px", // Add padding for better text spacing
                }}
                value={description} // Bind textarea to state
                onChange={(e) => setDescription(e.target.value)}
                onFocus={(e) => {
                  e.target.style.outline = "none";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
            <div className="d-flex justify-content-end gap-3">
              <div className="pt-4 d-flex justify-content-end">
                <button
                  className="btn text-white"
                  style={{
                    width: "80px",
                    height: "35px",
                    backgroundColor: "#463aa1",
                  }}
                  onClick={handleAddDepartment}
                >
                  ADD
                </button>
              </div>
              <div className="pt-4 d-flex justify-content-end">
                <button
                  className="btn text-white d-flex justify-content-center"
                  style={{
                    width: "80px",
                    height: "35px",
                    backgroundColor: "#ff5777",
                  }}
                  onClick={handleCancel}
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
