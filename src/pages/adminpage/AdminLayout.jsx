
import React, { useState, useEffect } from "react";
import { useLocation, Outlet, Navigate } from "react-router-dom";
import styled from "styled-components";

import AdminLoginForm from "./login/AdminLogin"; 
import NavbarAdmin from "../../components/NavbarAdmin"

function AdminLayout() {

  // 예: localStorage에 "adminToken" 있으면 로그인 상태
  const isLoggedIn = !!localStorage.getItem("adminToken");
  console.log("AdminLayout - isLoggedIn:", isLoggedIn);


    return(
      <div>
        {/* 상단바 + 사이드바 */}
        <NavbarAdmin />

        {/* 메인 Contents */}
        <div style={{ marginLeft: "290px", marginTop: "108px" }}>
          <Outlet />

          {/* 로그인여부에따른 로그인창 */}
          {!isLoggedIn && <AdminLoginForm />}
      </div>
    </div>
    )
}

export default AdminLayout;


