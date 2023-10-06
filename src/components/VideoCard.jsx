import React, { useState, useEffect, useContext } from "react";

import { Link } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";

import VideoLength from "../shared/VideoLength";
import { generateRandomDuration, generateRandomViews, generateRandomLikes, randomTimeAgo, genrateRandomProfilePicLink } from "../utils/functions";

import { Context } from "../context/contextApi"; // Import context


import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';


const VideoCard = ({ video}) => {
  
  
  const { userToken, addRemoveFromWatchLater, watchList } = useContext(Context);


  const [watchLater, setWatchLater] = useState(false);
  
  const [randomDuration, setRandomDuration] = useState("")
  const [views, setViews] = useState("");
  const [timeAgo, setTimeAgo] = useState("");
  const [avatar, setAvatar] = useState()

  // const [displayWatchList, setDisplayWatchList] = useState([])

  useEffect(() => {
    // Generate views and timeAgo once when the component mounts
    setRandomDuration(generateRandomDuration(video?.type));
    setViews(generateRandomViews(generateRandomLikes()));
    setAvatar(genrateRandomProfilePicLink())
    setTimeAgo(randomTimeAgo());
    setWatchLater(watchList.some(item => item?._id === video?._id))

  }, []);

  const toggleWatchlist = async () => {

    await addRemoveFromWatchLater(video?._id, userToken)
    setWatchLater((prev) => !prev);
  };

  return (

    <>
      {/* console.log(randomDuration) */}
      <div className="flex flex-col mb-8">
        <Link to={`/video/${video?._id}`}>
          <div className="relative h-48 md:h-40 md:rounded-xl overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src={video?.thumbnail}
              alt="thumbnail"
            />
            {randomDuration && (
              <VideoLength time={randomDuration} />
            )}
          </div>
        </Link>
        {/* <------------ edited ---------.  */}


        <div className="flex text-white mt-3">
          <Link to={`/video/${video?._id}`}>
            <div className="flex items-start">
              <div className="flex h-9 w-9 rounded-full overflow-hidden">
                <img
                  className="h-full w-full object-cover"
                  src={avatar}
                  alt="avatar"

                />
              </div>
            </div>
          </Link>


          <div className="flex justify-between basis-[85%] items-center">

            <Link to={`/video/${video?._id}`}>

              <div className="flex flex-col ml-3 overflow-hidden">
                <span className="text-sm font-bold line-clamp-2">
                  {video?.title}
                </span>
                <span className="text-[12px] font-semibold mt-2 text-white/[0.7] flex items-center">
                  {video?.director}

                  <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />

                </span>

                <div className="flex text-[12px] font-semibold text-white/[0.7] truncate overflow-hidden">
                  <span>{`${views} views`}</span>
                  <span className="flex text-[24px] leading-none font-bold text-white/[0.7] relative top-[-10px] mx-1">
                    .
                  </span>
                  <span className="truncate">
                    {timeAgo}
                  </span>
                </div>
              </div>

            </Link>

            <div className="cursor-pointer transition duration-300 ease-in-out transform hover:scale-110"
              onClick={toggleWatchlist}>

              {
                watchLater ? <WatchLaterRoundedIcon /> : <WatchLaterOutlinedIcon />
              }

            </div>

          </div>
        </div>

      </div>
    </ >

  );
};

export default VideoCard;




