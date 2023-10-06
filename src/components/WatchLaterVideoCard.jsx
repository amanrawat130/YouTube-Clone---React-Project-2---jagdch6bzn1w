
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../context/contextApi"; // Import context
import LeftNav from "./LeftNav";

import { Link } from "react-router-dom";
import { BsFillCheckCircleFill } from "react-icons/bs";
import VideoLength from "../shared/VideoLength";

import { generateRandomDuration, generateRandomViews, generateRandomLikes, randomTimeAgo, genrateRandomProfilePicLink } from "../utils/functions";



import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';


import WatchLaterIcon from '@mui/icons-material/WatchLater';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));





function WatchLaterVideoCard(videos) {

    const [video,setVideo] = useState();

    const { setLoading, watchList, addRemoveFromWatchLater, userToken } = useContext(Context);

    const [randomDuration, setRandomDuration] = useState("")
    const [views, setViews] = useState("");
    const [timeAgo, setTimeAgo] = useState("");
    const [avatar, setAvatar] = useState()

    useEffect(() => {
        setViews(generateRandomViews(generateRandomLikes()));
        setAvatar(genrateRandomProfilePicLink())
        setTimeAgo(randomTimeAgo());
        setRandomDuration(generateRandomDuration(video?.type));
        // console.log("video from watchvideo detail", video?.title) 
        setVideo(videos.video)

    }, []);

    const toggleWatchlist = async (id) => {
        console.log("tpggled", id)
        await addRemoveFromWatchLater(id, userToken)
    };


    // < --- Material Ui ---> 

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // <---End-->

    return (

        <div className="flex flex-col  md:flex-row mb-8 md:mb-3 lg:hover:bg-white/[0.1] rounded-xl md:p-4">
            <Link to={`/video/${video?._Id}`}>
                <div className="relative flex shrink-0 h-48 md:h-30 lg:h-40 xl:h-48 w-full md:w-48 lg:w-64 xl:w-80 rounded-xl bg-slate-800 overflow-hidden">
                    <img
                        className="h-full w-full object-cover"
                        src={video?.thumbnail}
                    />
                    {randomDuration && (
                        <VideoLength time={randomDuration} />
                    )}
                </div>
            </Link>
            <div className="flex flex-col ml-4 md:ml-6 mt-4 md:mt-0 overflow-hidden">
                <Link to={`/video/${video?._Id}`}>
                    <span className="text-lg md:text-2xl font-semibold line-clamp-2 text-white">
                        {video?.title}
                    </span>
                    <span className="empty:hidden text-sm line-clamp-1 md:line-clamp-2 text-white/[0.7] md:pr-24 md:my-4">
                        {video?.description}
                    </span>
                    <div className="hidden md:flex items-center">
                        <div className="flex items-start mr-3">
                            <div className="flex h-9 w-9 rounded-full overflow-hidden">
                                <img
                                    className="h-full w-full object-cover"
                                    src={avatar}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold mt-2 text-white/[0.7] flex items-center">
                                {video?.director}
                                <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] lg:text-[10px] xl:text-[12px] ml-1" />
                            </span>
                            <div className="flex text-sm font-semibold text-white/[0.7] truncate overflow-hidden">
                                <span>{`${views} views`}</span>
                                <span className="flex text-[24px] leading-none font-bold text-white/[0.7] relative top-[-10px] mx-1">
                                    .
                                </span>
                                <span className="truncate">
                                    {timeAgo}
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>

            <div>
                <IconButton
                    id="demo-customized-button"
                    aria-controls={open ? 'demo-customized-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    variant="contained"
                    disableelevation={true.toString()}
                    onClick={handleClick}
                    sx={{ color: "white" }}

                >
                    <MoreVertIcon />
                </IconButton>
                <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => { handleClose(); toggleWatchlist(video?._id); }} disableRipple>
                        <WatchLaterOutlinedIcon />
                        remove from watch later
                    </MenuItem>
                </StyledMenu>
            </div>

        </div>
    );
}

export default WatchLaterVideoCard