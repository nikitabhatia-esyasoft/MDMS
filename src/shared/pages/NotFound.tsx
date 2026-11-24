import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>Not Found</h1>
      <h2>Page Not Found</h2>
      <p>The requested page does not exist.</p>
      <Link to="/login">Back to Login</Link>
    </div>
  );
};

export default NotFound;
