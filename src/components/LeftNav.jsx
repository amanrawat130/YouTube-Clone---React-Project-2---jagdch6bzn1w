import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import LeftNavMenuItem from "./LeftNavMenuItem";
import { categories } from "../utils/constants";
import { Context } from "../context/contextApi";

const LeftNav = () => {
    const { selectedCategory, setSelectedCategory, mobileMenu } =
        useContext(Context);

    const navigate = useNavigate();

    const clickHandler = (name, type) => {
        switch (name) {
            case "New":
                setSelectedCategory(name);
                navigate("/feed")
                return
            case "Video Song":
                setSelectedCategory(name);
                navigate(`/searchResult/${name}`)
                return
            case "Web Series":
                setSelectedCategory(name);
                navigate(`/searchResult/${name}`)
                return
            case "TV Show":
                setSelectedCategory(name);
                navigate(`/searchResult/${name}`)
                return
            case "Short Film":

                setSelectedCategory(name);
                navigate(`/searchResult/${name}`)
                return
            case "Movie":
                setSelectedCategory(name);
                navigate(`/searchResult/${name}`)
                return
            case "Trailer":
                setSelectedCategory(name);
                navigate(`/searchResult/${name}`)
                return
            case "Documentary":
                setSelectedCategory(name);
                navigate(`/searchResult/${name}`)
                return

            case "Watch Later":
                setSelectedCategory(name);
                navigate(`/watchlater`)
                return

            default:
                break;
        }
    };

    return (
        <div
            className={`md:block w-[240px] overflow-y-auto h-full py-4 bg-black absolute md:relative z-10 translate-x-[-240px] md:translate-x-0 transition-all ${mobileMenu ? "translate-x-0" : ""
                }`}
        >
            <div className="flex px-5 flex-col">
                {categories.map((item) => {
                    // console.log(item.name, item.type, "itemmmmm detail")
                    return (

                        <React.Fragment key={item.name}>
                            <LeftNavMenuItem
                                text={item.type === "home" ? "Home" : item.name}
                                icon={item.icon}
                                c
                                action={() => {
                                    clickHandler(item.name, item.type);

                                    // navigate("/feed");
                                }}
                                className={`${selectedCategory === item.name
                                        ? "bg-white/[0.15]"
                                        : ""
                                    }`}
                            />
                            {item.divider && (
                                <hr className="my-5 border-white/[0.2]" />
                            )}
                        </React.Fragment>
                    );
                })}
                <hr className="my-5 border-white/[0.2]" />
                <div className="text-white/[0.5] text-[12px]">
                    Clone by: Aman Rawat
                </div>
            </div>
        </div>
    );
};

export default LeftNav;


