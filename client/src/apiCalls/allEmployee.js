import { axiosInstance4000 } from ".";

export const GetAllEmployee = async () => {
  try {
    const res = await axiosInstance4000.get("api/employee/getAllEmployee");
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const GetNumberOfEmployee = async () => {
  try {
    const res = await axiosInstance4000.get("api/employee/getNumberOfEmployee");
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const SetEmpInfo = async (empData) => {
  try {
    const res = await axiosInstance4000.post(
      "api/employee/setEmpInfo",
      empData
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const DeleteRecord = async (id) => {
  try {
    const res = await axiosInstance4000.delete(`api/employee/deleteEmp/${id}`);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};
