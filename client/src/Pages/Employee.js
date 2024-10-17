import React, { useEffect, useState } from "react";
import { Header } from "../component/Header";
import { GetDepartmentName } from "../apiCalls/allDepartment";
import { SetEmpInfo } from "../apiCalls/allEmployee";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Employee = () => {
  const [deptName, setDeptName] = useState([]);
  const [selectedDeptName, setSelectedDeptName] = useState("Finance");
  const [empName, setEmpName] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const GetName = async () => {
      try {
        const response = await GetDepartmentName();
        if (response.success) {
          setDeptName(response.data);
        } else {
          console.log("No dept found");
        }
      } catch (err) {}
    };
    GetName();
  }, []);

  const handleEmpDetails = async () => {
    if (!empName || !address) {
      toast.success("Employee name and address are required.");
      return; // Exit the function if validation fails
    }

    const empData = {
      name: empName,
      dept: selectedDeptName,
      address: address,
    };

    try {
      const response = await SetEmpInfo(empData);
      if (response.success) {
        setEmpName("");
        setAddress("");
        toast.success(response.message);
      } else {
        toast.success("Error in storing employee info");
      }
    } catch (err) {
      toast.success(err);
    }
  };

  const handleCancel = () => {
    navigate("/home");
  };

  return (
    <>
      <Header />
      <h4 className="pt-3 px-3">Employee</h4>
      <hr
        class=" border-bottom mt-3"
        style={{ width: "93%", marginTop: "-15px", marginLeft: "20px" }}
      />
      <div
        className="container d-flex justify-content-center align-items-center shadow-4 mt-3 pt-3"
        style={{
          width: "600px",
          height: "420px",
          //   padding: "20px",
        }}
      >
        <div className="col-md-10">
          <div className="row">
            <div>
              <h6> Employee Name</h6>
              <input
                type="text"
                style={{ width: "100%" }}
                onFocus={(e) => {
                  e.target.style.outline = "none";
                  e.target.style.boxShadow = "none";
                }}
                value={empName}
                onChange={(e) => setEmpName(e.target.value)}
              />
            </div>

            <div>
              <p className="pt-4 ">Department</p>
              <select
                className="form-select w-100"
                value={selectedDeptName}
                onChange={(e) => setSelectedDeptName(e.target.value)}
              >
                {deptName.map((dept, index) => (
                  <option key={index} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-4">
              <h6> Address</h6>
              <textarea
                type="text"
                style={{
                  height: "100px",
                  width: "100%",
                  resize: "none", // Prevent resizing if needed
                  border: "1px solid #ccc", // Light border
                  padding: "8px", // Add padding for better text spacing
                }}
                onFocus={(e) => {
                  e.target.style.outline = "none";
                  e.target.style.boxShadow = "none";
                }}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="d-flex justify-content-end gap-3">
              <div className="pt-4 d-flex justify-content-end">
                <button
                  className="btn text-white "
                  style={{
                    width: "80px",
                    height: "35px",
                    backgroundColor: "#463aa1",
                  }}
                  onClick={handleEmpDetails}
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
      {/* Empty div for space */}
      <div style={{ height: "50px" }}></div>
    </>
  );
};
