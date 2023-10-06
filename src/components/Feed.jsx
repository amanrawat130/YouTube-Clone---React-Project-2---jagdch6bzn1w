import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/contextApi";
import LeftNav from "./LeftNav";
import VideoCard from "./VideoCard";
import { fetchDataFromApi } from "../utils/api";
import { useAuth } from "../utils/auth"
import { useNavigate } from 'react-router-dom';


const Feed = () => {

    const { loading, setLoading, setSnakeBarMessage, setShouldDisplaySignInMessage } = useContext(Context);
    const navigate = useNavigate();
    const isAuthenticated = useAuth();
    const [searchResults, setSearchResults] = useState([]);



    useEffect(() => {
        document.getElementById("root").classList.remove("custom-h");
        if (!isAuthenticated) {

            setSnakeBarMessage("User not logged in")
            setShouldDisplaySignInMessage(true)

            navigate('/signin');
        } else {
            setSnakeBarMessage("")
            setShouldDisplaySignInMessage(false)
            fetchHomeResults();

        }
    }, []);
    

    const fetchHomeResults = async () => {
        setLoading(true);
        await fetchDataFromApi(null).then((res) => {
            setSearchResults(res?.data);
            setLoading(false);
        });
    };


    return (
        <div className="flex flex-row h-[calc(100%-56px)] ">
            <LeftNav />
            <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
                    {!loading &&
                        searchResults.map((item) => {                           
                            return ( 
                                <VideoCard
                                    key={item?._id}
                                    video={item}
                                />
                            );
                        })}
                </div>
            </div>
        </div>

    );
};

export default Feed;



