
import React, { useContext } from "react";
import { LocationDataContext } from "../Context/DataContext";
const StatusBadge = ({ status }) => {
  const { orderStatusData } = useContext(LocationDataContext);

  // Retrieve the color for the status from the orderStatusData
  const statusColor = orderStatusData?.find(
    (statusItem) => statusItem.OrderStatus === status
  )?.HexColorCode;

  // If no color is found, default to black
  const badgeColor = statusColor || "#000";

  return (
    <span
    className={`px-3 py-1 rounded-full text-white text-xs`}
    style={{
      backgroundColor: badgeColor,
      boxShadow: `0 0 0 1px ${badgeColor}30`,
    }}
  >
    {status}
  </span>
  );
};

export default StatusBadge;