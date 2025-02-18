
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

import AdminLoginForm from "./login/AdminLogin"; 
import NavbarAdmin from "../../components/NavbarAdmin"

function AdminLayout() {

  // 예: localStorage에 "adminToken" 있으면 로그인 상태
  const isLoggedIn = !!localStorage.getItem("adminToken");
  console.log("AdminLayout - isLoggedIn:", isLoggedIn);

  const navigate = useNavigate();
  useEffect(() => {
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    if (tokenExpiration && Date.now() > tokenExpiration) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("tokenExpiration");
      alert("로그인정보가 만료되었습니다. 다시 로그인 해주세요.");
      // 리디렉션
      navigate("/adminpage");
    }
  }, [navigate]);


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


