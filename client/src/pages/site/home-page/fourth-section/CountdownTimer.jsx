import React from "react";
import { Link } from "react-router-dom";
import DateTimeDisplay from "./DateTimeDisplay";
import { useCountdown } from "./useCountdown";
import "./index.scss";
import BannerMan from "../../../../assets/banner-man_grande.png";
const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div id="fourthSection">
      <div className="mainDiv">
        <div className="container">
          <div className="left">
            <div className="deal-area">
              <h2>DEAL OF THE DAY</h2>
              <p>Get 40% off to our products</p>
            </div>
            <div className="timeBox">
              <span className="time">
                <DateTimeDisplay value={days} type={"Days"} isDanger={false} />
              </span>
              <span className="time">
                <DateTimeDisplay value={hours} type={"Hour"} isDanger={false} />
              </span>
              <span className="time">
                <DateTimeDisplay
                  value={minutes}
                  type={"Min"}
                  isDanger={false}
                />
              </span>
              <div className="time">
                <DateTimeDisplay
                  value={seconds}
                  type={"Sec"}
                  isDanger={false}
                />
              </div>
            </div>
            <div className="allProductBtn">
              <Link to={"/products"}>
                <button className="btn">ALL PRODUCT</button>
              </Link>
            </div>
          </div>
          <div className="right">
            <img src={BannerMan} alt="banner-man" />
          </div>
        </div>
      </div>
    </div>
  );
};

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;
