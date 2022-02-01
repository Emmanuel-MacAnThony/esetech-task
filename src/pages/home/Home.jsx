import React, { useEffect, useState } from "react";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css";
import { getVideos } from "./../../services/videoService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [displayData, setDisplayData] = useState([]);

  //helper order functgion

  const order = (data, orderString) => {
    if (orderString === "rasc") {
      return _.orderBy(data, ["rating"], ["asc"]);
    }
    if (orderString === "radesc") {
      return _.orderBy(data, ["rating"], ["desc"]);
    }
    if (orderString === "reasc") {
      return _.orderBy(data, ["first_release_date"], ["asc"]);
    }
    if (orderString === "redesc") {
      return _.orderBy(data, ["first_release_date"], ["desc"]);
    }
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await getVideos();
        setVideos(res.data);
        setDisplayData(res.data);
      } catch (error) {
        //normally i would log this to a platform like sentry, but time constraints wont permit. So i just console.log, and display a toasty
        toast.error("An error occured");
        console.log(error);
      }
    };
    fetchVideos();
  }, []);

  const handleOrderedSearch = (searchString, orderString) => {
    let filteredVideos = displayData;
    if (searchString) {
      let preparedSearchString = searchString.toLowerCase(); //to enable case-insensitive searching
      filteredVideos = videos.filter((video) =>
        video.name.toLowerCase().includes(preparedSearchString)
      );
      setDisplayData(filteredVideos);
    } else {
      filteredVideos = videos;
      setDisplayData(filteredVideos); //this takes care of scenario where after typing and updating displayed data , you click clear.
    }

    if (orderString !== "none") {
      let orderedVideo = order(filteredVideos, orderString);
      setDisplayData(orderedVideo);
    }
    console.log(filteredVideos);
  };
  return (
    <div className="homeContainer">
      <Leftbar data={displayData} handleOrderedSearch={handleOrderedSearch} />
      <Rightbar data={displayData} />
    </div>
  );
};

export default Home;
