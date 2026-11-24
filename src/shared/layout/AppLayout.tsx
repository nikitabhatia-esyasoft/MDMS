import React from "react";
import { Link, Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <header>
        <h2>MDMS</h2>
      </header>

      <aside>
        <nav>
          <Link to="/user/dashboard">End User</Link>
          {"|"}
          <Link to="/zone/dashboard">Zone Dashboard</Link>
          {"|"}
          <Link to="/enterprise/dashboard">Enterprise Dashboard</Link>
          {"|"}
          <Link to="/profile">Profile</Link>
        </nav>
      </aside>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
