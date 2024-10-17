import React, { useEffect, useState } from "react";
import { DeleteRecord, GetAllEmployee } from "../apiCalls/allEmployee";
import { IoSearch } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import "./EmployeeInfo.css";
import { Header } from "../component/Header";
import Pagination from "./Pagination";
import { FaTrash } from "react-icons/fa6";
import toast from "react-hot-toast";

export const EmployeeInfo = () => {
  const [allEmployee, setAllEmployee] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchDepartment, setSearchDepartment] = useState("");
  const [namePlaceholder, setNamePlaceholder] = useState("Name");
  const [departmentPlaceholder, setDepartmentPlaceholder] =
    useState("Department");

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);
  // const [employeesPerPage] = useState(5); // You can change the number of employees per page

  useEffect(() => {
    GetEmployee();
  }, []);

  const GetEmployee = async () => {
    try {
      const response = await GetAllEmployee();
      if (response.success) {
        setAllEmployee(response.data);
      } else {
        console.log("Employee data could not be fetched");
      }
    } catch (err) {}
  };

  // Filter the employee list based on search input
  const filteredEmployees = allEmployee.filter((employee) => {
    const matchesName = employee.name
      .toLowerCase()
      .includes(searchName.toLowerCase());
    const matchesDepartment = employee.department
      .toLowerCase()
      .includes(searchDepartment.toLowerCase());

    // Return true if both name and department match the input
    return matchesName && matchesDepartment;
  });

  const handleDelete = async (id) => {
    try {
      const response = await DeleteRecord(id);
      if (response.success) {
        toast.success(response.message);
        await GetEmployee();
      } else {
        toast.success("Record can not be deleted");
      }
    } catch (err) {
      toast.success(err);
    }
  };

  // Pagination logic for the filtered employees
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const clearSearchName = () => {
    setSearchName("");
    GetEmployee();
  };

  const clearSearchDepartment = () => {
    setSearchDepartment("");
    GetEmployee();
  };

  return (
    <>
      <Header />
      <section>
        <div className="mt-5" style={{ marginLeft: "80px" }}>
          <div className="d-flex justify-content-between">
            <h2 className="fw-bold" style={{ letterSpacing: "3px" }}>
              Employee
            </h2>
            <div
              className="d-flex gap-4"
              style={{
                position: "relative",
                display: "inline-block",
                paddingRight: "30px",
              }}
            >
              <IoSearch
                style={{
                  position: "absolute",
                  top: "40%",
                  left: "10",
                  transform: "translateY(-50%)",
                  // color: "#1f7ff0", // Icon color
                  fontSize: "20px", // Icon size
                }}
              />
              {searchName && (
                <IoMdClose
                  style={{
                    position: "absolute",
                    top: "40%",
                    left: "170",
                    transform: "translateY(-50%)",
                    // color: "#1f7ff0", // Icon color
                    fontSize: "20px", // Icon size
                    cursor: "pointer",
                  }}
                  onClick={clearSearchName}
                />
              )}

              <input
                type="text"
                value={searchName}
                placeholder={namePlaceholder}
                className="search-input"
                style={{
                  height: "35px",
                  width: "200px",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                  // padding: "5px",
                  outline: "none",
                  boxShadow: "none",
                  paddingLeft: "35px",
                }}
                onChange={(e) => setSearchName(e.target.value)}
                onFocus={() => setNamePlaceholder("")} // Hide placeholder on focus
                onBlur={() => setNamePlaceholder("Name")} // Restore placeholder on blur
              />

              {searchDepartment && (
                <IoMdClose
                  style={{
                    position: "absolute",
                    top: "40%",
                    left: "390",
                    transform: "translateY(-50%)",
                    // color: "#1f7ff0", // Icon color
                    fontSize: "20px", // Icon size
                    cursor: "pointer",
                  }}
                  onClick={clearSearchDepartment}
                />
              )}
              <IoSearch
                style={{
                  position: "absolute",
                  top: "40%",
                  left: "235px",
                  transform: "translateY(-50%)",
                  // color: "#1f7ff0", // Icon color
                  fontSize: "20px", // Icon size
                }}
              />

              <input
                type="text"
                value={searchDepartment}
                placeholder={departmentPlaceholder}
                className="me-5 search-input"
                style={{
                  height: "35px",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                  // padding: "10px",
                  outline: "none",
                  boxShadow: "none",
                  paddingLeft: "35px",
                  width: "200px",
                }}
                onChange={(e) => setSearchDepartment(e.target.value)}
                onFocus={() => setDepartmentPlaceholder("")} // Hide placeholder on focus
                onBlur={() => setDepartmentPlaceholder("Department")} // Restore placeholder on blur
              />
            </div>
          </div>

          <hr
            class=" border-bottom mt-3"
            style={{ width: "93%", marginTop: "-15px" }}
          />
        </div>

        {filteredEmployees.length > 0 ? (
          <div className="col-md-10 ms-5">
            <table className="table text-center table-borderless table-striped table-hover shadow-sm">
              <thead>
                <tr>
                  <th>ID </th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Address</th>
                  <th>Action </th>
                </tr>
              </thead>
              <tbody>
                {/* {filteredEmployees.map((data, index) => ( */}
                {currentEmployees.map((data, index) => (
                  <tr key={index}>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.department}</td>
                    <td>{data.address}</td>
                    <td>
                      {
                        <FaTrash
                          style={{
                            height: "20px",
                            width: "20px",
                            color: "red",
                            cursor: "pointer",
                          }}
                          onClick={() => handleDelete(data.id)}
                        />
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Pagination
              postPerPage={postPerPage}
              // totalPost={data.length}
              totalPost={filteredEmployees.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        ) : (
          <div className="col-md-10 ms-5">
            <p>No employee data available</p>
          </div>
        )}
      </section>
    </>
  );
};
