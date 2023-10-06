import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../context/contextApi";

import { fetchDataFromApi } from "../utils/api";
import LeftNav from "./LeftNav";
import SearchResultVideoCard from "./SearchResultVideoCard";

const SearchResult = () => {
    const [result, setResult] = useState();
    const { searchQuery } = useParams();
    const { setLoading, selectedCategory, searchResults, setSelectedCategory } = useContext(Context);

    useEffect(() => {
        document.getElementById("root").classList.remove("custom-h");
        console.log("calling from search result")

        if (selectedCategory !== "New" || selectedCategory !== "watch later" ) {
            fetchSearchResults();
        }else if(searchQuery!==""){
            fetchSearchResults();
            setSelectedCategory(
                searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1));
        }
    }, [searchQuery,selectedCategory]);
    
    const fetchSearchResults = () => {
            setLoading(true);

            console.log(` search query inside search result ${searchQuery}`)
            fetchDataFromApi(`${searchQuery}`)
                .then((res) => {
                    console.log(res,"andr fetc k");
                    setResult(res?.data);
                    setLoading(false);
                });

    };


    function generateRandomNumber() {
        const randomDecimal = Math.random();
        const randomNumber = Math.floor(randomDecimal * 60) + 1;
        return randomNumber;
    }

    return (
        <div className="flex flex-row h-[calc(100%-56px)]">
            <LeftNav />
            <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-black">
                <div className="grid grid-cols-1 gap-2 p-5">
                    {result?.map((item) => {
                        // const randomNum = generateRandomNumber();
                        return (
                            <SearchResultVideoCard
                                key={item._id}
                                video={item}
                               
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SearchResult;
