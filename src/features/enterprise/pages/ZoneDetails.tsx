import React from "react";
import { useParams } from "react-router-dom";

const ZoneDetails = () => {
  const { zoneId } = useParams();
  return (
    <div>
      <h1>Enterprise Zone Details</h1>
      <p>Zone Id: {zoneId}</p>
    </div>
  );
};

export default ZoneDetails;
