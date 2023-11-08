import React from "react";
import CountdownTimer from "./CountdownTimer";

const THREE_DAYS_IN_MS = 365 * 24 * 60 * 60 * 1000;
const NOW_IN_MS = new Date().getTime();
const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;
const FourthSection = () => {
  return (
    <div>
      <CountdownTimer targetDate={dateTimeAfterThreeDays} />
    </div>
  );
};

export default FourthSection;
