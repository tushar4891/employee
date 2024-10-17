import { axiosInstance5000 } from ".";

export const GetAllDepartment = async () => {
  try {
    const res = await axiosInstance5000.get("api/department/getAllDepartment");
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const GetTotalDepartment = async () => {
  try {
    const res = await axiosInstance5000.get(
      "api/department/getTotalNumberOfDepartment"
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const SetDepartmentData = async (department) => {
  try {
    const res = await axiosInstance5000.post(
      "api/department/setDepartment",
      department
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const GetDepartmentName = async () => {
  try {
    const res = await axiosInstance5000.get("api/department/getDeptName");
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};
