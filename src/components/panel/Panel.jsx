import React from "react";
import "./panel.css";

const Panel = ({ data }) => {
  return (
    <div className="panelContainer">
      <div className="panelContainerBox">
        <div className="panelContainerLeft"></div>
        <div className="panelContainerRight">
          <div className="movieTitle">{data.name}</div>
          <div className="movieReleaseDate">
            <span className="dateTitle">Release Date:</span>{" "}
            {data.first_release_date}
          </div>
          <div className="movieInfo">
            <div className="movieDescription">{data.summary}</div>
            <span className="movieRating">{parseInt(data.rating)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panel;
