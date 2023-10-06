
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../context/contextApi"; // Import context
import LeftNav from "./LeftNav";
import WatchLaterVideoCard from "./WatchLaterVideoCard";


function WatchLater() {

    const { watchList, setSelectedCategory,setLoading } = useContext(Context);

    const [result, setResult] = useState();

    
    useEffect(() => {
      setLoading(true);
      setResult([...watchList]);
        setSelectedCategory("Watch Later")
        console.log("ok effect")
        setLoading(false);
    }, [watchList]);
    

    return (
        <div className="flex flex-row h-[calc(100%-56px)]">
            <LeftNav />
            <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
                <div className="grid grid-cols-1 gap-2 p-5">

                {result?.map((item) => {

                    console.log(item,"item fro watch")

                          return (
                            <WatchLaterVideoCard
                                key={item._id}
                                video={item}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default WatchLater