const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const employeeSchema = require("./model/employeeModel");

const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // Allow only this origin
  })
);

//middleware is used to parse the incoming JSON
// payload so that the data in req.body is
//available for validation.
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const getData = async () => {
  try {
    const data = await employeeSchema.findOne({ id: 2 });
    console.log("DATA --- ", data);
  } catch (err) {
    console.error("Error retrieving employee data:", err);
  }
};

const loadEmployeeData = async () => {
  try {
    const data = fs.readFileSync("../employeeData.json", "utf-8");
    const employees = JSON.parse(data);
    for (let employee of employees) {
      const newEmployee = new employeeSchema({
        id: employee.id,
        name: employee.name,
        department: employee.department,
        address: employee.address,
      });
      await newEmployee.save();
    }
    console.log("Employee data inserted into the database!");
  } catch (err) {
    console.error("Error loading employee data:", err);
  }
};

app.get("/api/employee/getAllEmployee", async (req, res) => {
  try {
    const allEmployee = await employeeSchema.find();
    res.send({
      success: true,
      message: "Employee data fetched successfully",
      data: allEmployee,
    });
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.send({
      message: err.message,
      success: false,
    });
  }
});

app.get("/api/employee/getNumberOfEmployee", async (req, res) => {
  try {
    const totalNumberOfEmployee = await employeeSchema.countDocuments();
    res.send({
      success: true,
      message: "Employee data fetched successfully",
      data: totalNumberOfEmployee,
    });
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.send({
      message: err.message,
      success: false,
    });
  }
});

app.post("/api/employee/setEmpInfo", async (req, res) => {
  const data = req.body;
  const numberOfEmp = await employeeSchema.countDocuments();

  const empData = {
    id: numberOfEmp + 1,
    name: data.name,
    department: data.dept,
    address: data.address,
  };

  const newEmp = new employeeSchema(empData);
  try {
    const savedEmployee = await newEmp.save(); // Save it to the database
    res.send({
      success: true,
      message: "Employee added successfully",
      data: savedEmployee,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error saving Employee",
      error: err.message,
    });
  }
});

app.delete("/api/employee/deleteEmp/:id", async (req, res) => {
  const empId = req.params.id;
  try {
    const deletedEmployee = await employeeSchema.deleteOne({ id: empId }); // Save it to the database
    if (deletedEmployee.deletedCount > 0) {
      res.send({
        success: true,
        message: "Employee deleted successfully",
        data: deletedEmployee,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Employee not found",
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error deleting Employee",
      error: err.message,
    });
  }
});

const start = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDb");
    // await loadEmployeeData();
    // await getData();
  } catch (err) {
    console.error(err);
  }

  app.listen(4000, () => {
    console.log("Listening on port 4000 !");
  });
};

start();
