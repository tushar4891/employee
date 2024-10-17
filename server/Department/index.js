const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const departmentSchema = require("./model/departmentModel");

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

const loadDepartmentData = async () => {
  try {
    console.log("Inseide ");
    const data = fs.readFileSync("../departmentInfo.json", "utf-8");
    const allDepartment = JSON.parse(data);
    for (let department of allDepartment) {
      const newDepartment = new departmentSchema({
        id: department.id,
        name: department.name,
        description: department.description,
      });
      await newDepartment.save();
    }
    console.log("Department data inserted into the database!");
  } catch (err) {
    console.error("Error loading Department data:", err);
  }
};

app.get("/api/department/getAllDepartment", async (req, res) => {
  try {
    const allDepartment = await departmentSchema.find();
    res.send({
      success: true,
      message: "Department data fetched successfully",
      data: allDepartment,
    });
  } catch (err) {
    console.error("Error fetching department:", err);
    res.send({
      message: err.message,
      success: false,
    });
  }
});

app.get("/api/department/getTotalNumberOfDepartment", async (req, res) => {
  try {
    const totalDepartment = await departmentSchema.countDocuments();
    res.send({
      success: true,
      message: "Department data fetched successfully",
      data: totalDepartment,
    });
  } catch (err) {
    console.error("Error fetching department:", err);
    res.send({
      message: err.message,
      success: false,
    });
  }
});

app.post("/api/department/setDepartment", async (req, res) => {
  const department = req.body;
  const numberOfDept = await departmentSchema.countDocuments();

  const departmentData = {
    id: numberOfDept + 1,
    name: department.name,
    description: department.description,
  };

  const newDepartment = new departmentSchema(departmentData);

  try {
    const savedDepartment = await newDepartment.save(); // Save it to the database
    res.send({
      success: true,
      message: "Department added successfully",
      data: savedDepartment,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error saving department",
      error: err.message,
    });
  }
});

app.get("/api/department/getDeptName", async (req, res) => {
  try {
    const deptNames = await departmentSchema.find({}, { name: 1, _id: 0 });
    res.send({
      success: true,
      message: "Department name fetched successfully",
      data: deptNames,
    });
  } catch (err) {
    console.error("Error fetching department:", err);
    res.send({
      message: err.message,
      success: false,
    });
  }
});

const start = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDb");
    // await loadDepartmentData();
    // await getData();
  } catch (err) {
    console.error(err);
  }

  app.listen(5000, () => {
    console.log("Listening on port 5000 !");
  });
};

start();
