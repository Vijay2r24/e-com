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
      className={`inline-flex items-center justify-center rounded-full w-36 h-8 text-xs font-semibold text-white ring-1 ring-inset`}
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
