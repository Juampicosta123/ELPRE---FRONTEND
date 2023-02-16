import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Home from "../pages/Home";
import Login from "../pages/Login";
import StudentDetails from "../pages/StudentDetails";

import ProtectedRoute from "./ProtectedRoute";
import AddStudent from "../pages/AddStudent";
import EditStudent from "../pages/EditStudent";
import PayList from "../pages/PayList";
import AddPay from "../pages/AddPay";
import EditPay from "../pages/EditPay";
import Nopay from "../pages/Nopay";

const Routers = ({ isLogged, setLogin }) => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/*" element={<ProtectedRoute isLogged={isLogged} />}>
        <Route path="home" element={<Home />} />
        <Route path="nopay" element={<Nopay />} />
        <Route path="student/:id" element={<StudentDetails />} />
        <Route path="add-student" element={<AddStudent />} />
        <Route path="edit-student/:id" element={<EditStudent />} />
        <Route path="pays/:id" element={<PayList />} />
        <Route path="add-pay" element={<AddPay />} />
        <Route path="edit-pay/:id" element={<EditPay />} />
      </Route>

      <Route path="login" element={<Login setLogin={setLogin} />} />
    </Routes>
  );
};

export default Routers;
