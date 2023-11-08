import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { selectUser } from "../../../redux/slice/authSlice";
const AdminRoot = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  useEffect(() => {
    user?.role == "superAdmin"
      ? navigate("/admin/dashboard")
      : user?.role == "admin"
      ? navigate("/admin/dashboard")
      : navigate("/account");
  }, []);
  return (
    <div>
      <Outlet />
    </div>
  );
};
export default AdminRoot;
