import React from "react";

import { AiFillHome } from "react-icons/ai";
import { RiFeedbackLine } from "react-icons/ri";
import { FiSettings, FiHelpCircle } from "react-icons/fi";
import { IoMdMusicalNotes,IoMdVideocam,IoMdPlay,IoMdFilm,IoMdTv,IoIosVideocam,IoMdDesktop } from 'react-icons/io';
import WatchLaterSharpIcon from '@mui/icons-material/WatchLaterSharp';

export const categories = [
    { name: "New", icon: <AiFillHome/>, type: "home" },
    { name: "Video Song", icon: <IoMdMusicalNotes  />, type: "category" },
    { name: "Web Series", icon: <IoMdDesktop  />, type: "category" },
    { name: "TV Show", icon: <IoMdTv  />, type: "category" },
    { name: "Short Film", icon: <IoMdFilm  />, type: "category" },
    { name: "Movie", icon: <IoIosVideocam  />, type: "category" },
    { name: "Trailer", icon: <IoMdPlay />, type: "category" },
    { name: "Documentary", icon: <IoMdVideocam  />, type: "category" },
    { name: "Watch Later", icon: <WatchLaterSharpIcon  />, type: "category" },
    { name: "Settings", icon: <FiSettings />, type: "menu" },
];

