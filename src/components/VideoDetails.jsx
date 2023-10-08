import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { fetchDataFromApi, fetchDataFromApiById } from "../utils/api";
import { Context } from "../context/contextApi";
import SuggestionVideoCard from "./SuggestionVideoCard";
import { generateRandomNumberForProfile, generateRandomViews, generateRandomLikes, generateRandomSubscribersForProfile } from "../utils/functions";


const VideoDetails = () => {
    const [video, setVideo] = useState();
    const [relatedVideos, setRelatedVideos] = useState();
    const [videoType, setVideoType] = useState();

    const { id } = useParams();
    const { setLoading } = useContext(Context);

    const likes = generateRandomLikes()
    console.log("likesss",likes, typeof likes)

    useEffect(() => {
        document.getElementById("root").classList.add("custom-h");
        fetchVideoDetails();
    }, [id]);
    
    const fetchVideoDetails = async () => {
        setLoading(true);
        try {
            const res = await fetchDataFromApiById(id);
            const videoData = res.data[0];
            setVideo(videoData);
            setVideoType(videoData.type);
            setLoading(false);
            fetchRelatedVideos(videoData.type);
        } catch (error) {
            // Handle error
            console.error("Error fetching video details:", error);
            setLoading(false);
        }
    };
    
    const fetchRelatedVideos = async (videoType) => {
        if (!videoType) {
            // Handle case when type is undefined
            return;
        }
        setLoading(true);
        try {
            const res = await fetchDataFromApi(videoType);
            // console.log(res.data, "related video");
            setRelatedVideos(res.data)
            setLoading(false);
        } catch (error) {
            // Handle error
            console.error("Error fetching related videos:", error);
            setLoading(false);
        }
    };
    
    return (

        <div className="flex justify-center flex-row h-[calc(100%-56px)] bg-black">
            <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
                <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">
                    <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
                        <ReactPlayer
                            url= {video?.video_url}
                            controls
                            width="100%"
                            height="100%"
                            style={{ backgroundColor: "#000000" }}
                            playing={true}
                        />

                    </div>
                    <div className="text-white font-bold text-sm md:text-xl mt-4 line-clamp-2">
                        {video?.title}
                    </div>
                    <div className="flex justify-between flex-col md:flex-row mt-4">
                        <div className="flex">
                            <div className="flex items-start">
                                <div className="flex h-11 w-11 rounded-full overflow-hidden">
                                    <img
                                        className="h-full w-full object-cover"
                                        src={`https://i.pravatar.cc/${generateRandomNumberForProfile()}`}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col ml-3">
                                <div className="text-white text-md font-semibold flex items-center">
                                    {video?.director}
                                    {<BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                                    }
                                </div>
                                <div className="text-white/[0.7] text-sm">
                                {generateRandomSubscribersForProfile()}
                                </div>
                            </div>
                        </div>
                        <div className="flex text-white mt-4 md:mt-0">
                            <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15]">
                                <AiOutlineLike className="text-xl text-white mr-2" />
                                {`${likes} Likes`}
                            </div>
                            <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] ml-4">
                                {`${generateRandomViews(likes)} Views`}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
                    {relatedVideos?.map((item, index) => {
                        console.log("inside loop",index, item.director,)
                        return (
                            <SuggestionVideoCard
                                key={index}
                                video={item}
                                randomNum ={generateRandomNumberForProfile()}
                                generateRandomViews ={generateRandomViews(likes)}
                                generateRandomLikes = {generateRandomLikes()}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default VideoDetails;

