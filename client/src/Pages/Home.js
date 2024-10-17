import React, { useEffect, useState } from "react";
import { Sidebar } from "../component/Sidebar";
import { Header } from "../component/Header";
import { SlPeople } from "react-icons/sl";
import { GiBookshelf } from "react-icons/gi";
import "./home.css";
import { FiArrowRightCircle } from "react-icons/fi";
import { GetAllEmployee, GetNumberOfEmployee } from "../apiCalls/allEmployee";
import { useNavigate } from "react-router-dom";
import { GetTotalDepartment } from "../apiCalls/allDepartment";

export const Home = () => {
  const navigate = useNavigate();
  const [numberOfDepartment, setNumberOfDepartment] = useState(0);
  const [numberOfEmp, setNumberOfEmp] = useState(0);

  useEffect(() => {
    const GetEmp = async () => {
      try {
        const response = await GetNumberOfEmployee();
        if (response.success) {
          setNumberOfEmp(response.data);
        } else {
          console.log("Error in fetching employee info");
        }
      } catch (err) {}
    };
    GetEmp();
  }, []);

  useEffect(() => {
    const GetDept = async () => {
      try {
        const response = await GetTotalDepartment();
        if (response.success) {
          setNumberOfDepartment(response.data);
        } else {
          console.log("Error in fetching department info");
        }
      } catch (err) {}
    };
    GetDept();
  }, []);

  const handleEmployeeInfoClick = async () => {
    navigate("/employeeInfo");
  };

  const handleDepartmentInfoClick = async () => {
    navigate("/departmentInfo");
  };

  return (
    <>
      <div>
        <Header />
        <Sidebar />
        <div
          style={{
            marginLeft: "275px",
            marginTop: "20px",
            fontSize: "22px",
            fontWeight: "bold",
          }}
        >
          Dashboard
        </div>

        <div className="d-flex">
          <div
            className="col-md-4"
            style={{ marginLeft: "300px", marginTop: "20px" }}
          >
            <div className="card">
              <div className="card-header bg-primary text-white">
                <div className="row">
                  <div className="col">
                    <h3 className="display-3">{numberOfDepartment}</h3>
                    <h6> Department</h6>
                  </div>
                  <div className="col">
                    <GiBookshelf style={{ height: "100px", width: "100px" }} />
                  </div>
                </div>
              </div>
              <div
                className="card-footer"
                style={{
                  backgroundColor: "#2a52a3",
                  marginTop: "0",
                }}
              >
                <div
                  className="text-white text-center"
                  onClick={handleDepartmentInfoClick}
                  style={{ cursor: "pointer" }}
                >
                  <h5 className=" d-inline">More Info </h5>
                  <FiArrowRightCircle
                    className="d-inline"
                    style={{
                      height: "30px",
                      width: "30px",
                      paddingBottom: "5px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className="col-md-4"
            style={{ marginLeft: "30px", marginTop: "20px" }}
          >
            <div className="card">
              <div className="card-header bg-info text-white">
                <div className="row">
                  <div className="col">
                    <h3 className="display-3">{numberOfEmp}</h3>
                    <h6> Employee</h6>
                  </div>
                  <div className="col">
                    <SlPeople style={{ height: "100px", width: "100px" }} />
                  </div>
                </div>
              </div>

              <div
                className="card-footer"
                style={{
                  backgroundColor: "#336d81",
                  marginTop: "0",
                }}
              >
                <div
                  className="text-white text-center"
                  onClick={handleEmployeeInfoClick}
                  style={{ cursor: "pointer" }}
                >
                  <h5 className=" d-inline">More Info </h5>
                  <FiArrowRightCircle
                    className="d-inline"
                    style={{
                      height: "30px",
                      width: "30px",
                      paddingBottom: "5px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
