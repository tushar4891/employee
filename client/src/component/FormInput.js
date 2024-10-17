import React from "react";

function FormInput({ label, name, type, defaultValue }) {
  return (
    <div className="mt-2">
      <label className="form-label">{label}</label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        class="form-control"
      ></input>
    </div>
  );
}

export default FormInput;
