import React from "react";
import { useParams } from "react-router-dom";

const MeterDetails = () => {
  const { meterId } = useParams();
  return (
    <div>
      <h1>Zonal Meter Details</h1>
      <p>Meter ID: {meterId}</p>
    </div>
  );
};

export default MeterDetails;
