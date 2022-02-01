import React from "react";
import "./rightbar.css";
import Panel from "../panel/Panel";

const Rightbar = ({ data }) => {
  return (
    <div className="rightContainer">
      {data.map((video) => (
        <Panel key={video.id} data={video} />
      ))}
    </div>
  );
};

export default Rightbar;
