import React, { useEffect, useState } from "react";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css";
import { getVideos } from "./../../services/videoService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";
import { CircularProgress } from "@material-ui/core";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

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

    if (orderString === "none") {
      return videos;
    }
  };

  const search = (data, searchString) => {
    let preparedSearchString = searchString.toLowerCase(); //to enable case-insensitive searching
    let filteredVideos = videos.filter((video) =>
      video.name.toLowerCase().includes(preparedSearchString)
    );
    return filteredVideos;
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await getVideos();
        setIsFetching(false);
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

  const handleOrder = (orderString, indicator) => {
    //indicator indicates if a filtering operation has been carried out prior to ordering
    if (indicator) {
      let orderedData = order(displayData, orderString);
      setDisplayData(orderedData);
    } else {
      let orderedData = order(videos, orderString);
      setDisplayData(orderedData);
    }
  };

  const handleSearch = (searchString, indicator) => {
    //indicator indicates if an ordering operation has been carried out prior to searching
    if (indicator !== "none") {
      let filteredData = search(displayData, searchString);
      setDisplayData(order(filteredData, indicator));
    } else {
      let filteredData = search(videos, searchString);
      setDisplayData(filteredData);
    }
  };

  return isFetching ? (
    <CircularProgress className="isFetching" color="secondary" />
  ) : (
    <div className="homeContainer">
      <Leftbar
        data={displayData}
        handleOrder={handleOrder}
        handleSearch={handleSearch}
      />
      <Rightbar data={displayData} />
    </div>
  );
};

export default Home;
