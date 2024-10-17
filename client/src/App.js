import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Login } from "./Pages/Login";
import { Header } from "./component/Header";

import { Home } from "./Pages/Home";
import { Department } from "./Pages/Department";
import { Employee } from "./Pages/Employee";
import { EmployeeInfo } from "./Pages/EmployeeInfo";
import { DepartmentInfo } from "./Pages/DepartmentInfo";

function App() {
  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false} />
      {/* <AuthProvider> */}
      <BrowserRouter>
        <Routes>
          <Route path="/login" and element={<Login />} />
          <Route path="/home" and element={<Home />} />
          <Route path="/department" and element={<Department />} />
          <Route path="/employee" and element={<Employee />} />
          <Route path="/employeeInfo" and element={<EmployeeInfo />} />
          <Route path="/departmentInfo" and element={<DepartmentInfo />} />
        </Routes>
      </BrowserRouter>
      {/* </AuthProvider> */}
    </div>
  );
}

export default App;
