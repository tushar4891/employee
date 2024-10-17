import React, { useEffect, useState } from "react";
import { GetAllDepartment } from "../apiCalls/allDepartment";
import { Header } from "../component/Header";

export const DepartmentInfo = () => {
  const [allDepartment, setAllDepartment] = useState([]);
  useEffect(() => {
    GetDepartment();
  }, []);

  const GetDepartment = async () => {
    try {
      const response = await GetAllDepartment();
      if (response.success) {
        setAllDepartment(response.data);
      } else {
        console.log("Department data could not be fetched");
      }
    } catch (err) {}
  };

  return (
    <>
      <Header />
      <section>
        <div className="mt-5" style={{ marginLeft: "80px" }}>
          <div className="d-flex justify-content-between">
            <h2 className="fw-bold" style={{ letterSpacing: "3px" }}>
              Department
            </h2>
          </div>
          <hr
            class=" border-bottom mt-3"
            style={{ width: "93%", marginTop: "-15px" }}
          />
        </div>

        {
          <div className="col-md-10 ms-5">
            <table className="table text-center table-borderless table-striped table-hover shadow-sm">
              <thead>
                <tr>
                  <th>ID </th>
                  <th>Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {allDepartment.map((data, index) => (
                  <tr key={index}>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      </section>
    </>
  );
};
