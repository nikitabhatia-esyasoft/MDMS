import React from "react";
import { Link, useParams } from "react-router-dom";

const BillDetails = () => {
  const { billId } = useParams();
  return (
    <div>
      <h1>Bill Details</h1>
      <p>Bill ID: {billId}</p>
      <Link to="/user/bills">Back to Bills</Link>
    </div>
  );
};

export default BillDetails;
