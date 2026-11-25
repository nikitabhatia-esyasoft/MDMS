import React from "react";
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

const ServerError = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>{error.status}</h1>
        <p>{error.statusText}</p>
        <Link to="/login">Back to Login</Link>
      </div>
    );
  }
  return (
    <div>
      <h1>Server Error</h1>
      <h2>Something went wrong</h2>

      <p>Please try again later.</p>
      <Link to="/login">Back to login</Link>
    </div>
  );
};

export default ServerError;
