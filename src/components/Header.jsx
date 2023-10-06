import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import ytLogo from "../images/yt-logo.png";
import ytLogoMobile from "../images/yt-logo-mobile.png";

import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import { Context } from "../context/contextApi";
import Loader from "../shared/Loader";
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';

import { useAuth } from "../utils/auth"

const Header = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const { loading, mobileMenu, setMobileMenu, setSnakeBarMessage, setShouldDisplaySignInMessage, userName, logout, updateWatchLaterList, userToken, userData } = useContext(Context);

    const navigate = useNavigate();
    const isAuthenticated = useAuth();


    useEffect(() => {


        if (!isAuthenticated) {

            setSnakeBarMessage("User not logged in")
            setShouldDisplaySignInMessage(true)

            navigate('/signin');
            return
        } else {
            updateWatchLaterList(userToken)
        }
    }, []);



    function capitalizeFirstLetter(string) {

        return string.charAt(0).toUpperCase()
    }

    const name = isAuthenticated ? capitalizeFirstLetter(userName) : "Aman";
 
    const [anchorEl, setAnchorEl] = useState(null); // profile menu anchor

    // <------------ events for toggle profile menu ------------------>
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);

    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    // <------- main navbar ------------------->


    const searchQueryHandler = (event) => {
        if (
            (event?.key === "Enter" || event === "searchButton") &&
            searchQuery?.length > 0
        ) {
            navigate(`/searchResult/${searchQuery}`);
        }
    };

    const mobileMenuToggle = () => {
        setMobileMenu(!mobileMenu);
    };

    const { pathname } = useLocation();
    const pageName = pathname?.split("/")?.filter(Boolean)?.[0];

    // <----- profile menu functions -------> 
    const handleLogout = () => {
        logout()
        navigate("/signin")
    }

    return (

        <div className="sticky top-0 z-10 flex flex-row items-center justify-between h-14 px-4 md:px-5 bg-white dark:bg-black">
            {loading && <Loader />}

            <div className="flex h-5 items-center">
                {pageName !== "video" && (
                    <div
                        className="flex md:hidden md:mr-6 cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]"
                        onClick={mobileMenuToggle}
                    >
                        {mobileMenu ? (
                            <CgClose className="text-white text-xl" />
                        ) : (
                            <SlMenu className="text-white text-xl" />
                        )}
                    </div>
                )}
                <Link to="/feed" className="flex h-5 items-center">
                    <img
                        className="h-full hidden dark:md:block"
                        src={ytLogo}
                        alt="Youtube"
                    />
                    <img
                        className="h-full md:hidden"
                        src={ytLogoMobile}
                        alt="Youtube"
                    />
                </Link>
            </div>
            <div className="group flex items-center">
                <div className="flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
                    <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
                        <IoIosSearch className="text-white text-xl" />
                    </div>
                    <input
                        type="text"
                        className="bg-transparent outline-none text-white pr-5 pl-5 md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyUp={searchQueryHandler}
                        placeholder="Search"
                        value={searchQuery}
                    />
                </div>
                <button
                    className="w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#303030] rounded-r-3xl bg-white/[0.1]"
                    onClick={() => searchQueryHandler("searchButton")}
                >
                    <IoIosSearch className="text-white text-xl" />
                </button>
            </div>
            <div className="flex items-center">
                <div className="hidden md:flex">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
                        <RiVideoAddLine className="text-white text-xl cursor-pointer" />
                    </div>
                    <div className="flex items-center justify-center ml-2 h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
                        <FiBell className="text-white text-xl cursor-pointer" />
                    </div>
                </div>

                <div className="flex  overflow-hidden rounded-full md:ml-4 cursor-pointer" >
                    {/* <img src="https://xsgames.co/randomusers/assets/avatars/female/67.jpg" onClick={handleClick} /> */}
                    {/* <Avatar  sx={{ bgcolor: deepOrange[500],width: 32,height: 32, fontSize:16}}>N</Avatar> */}

                    <Avatar
                        sx={{
                            width: { xs: 24, md: 32 }, // Adjust the width for different screen sizes
                            height: { xs: 24, md: 32 }, // Adjust the height for different screen sizes
                            bgcolor: userData.profileImage ? "black" : deepOrange[500],
                            fontSize: { xs: 12, md: 16 }, // Adjust the font size for different screen sizes
                            border: "1px solid white"
                        }}
                        onClick={handleClick}
                    >
                        {userData.profileImage ? (
                            <img src={userData.profileImage} alt="Profile Image" /> // Render the image if profileImage exists
                        ) : (
                            name // Render the name if profileImage doesn't exist
                        )}

                    </Avatar>

                    {<Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'center',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'center',
                            horizontal: 'right',
                        }}
                    >
                        <List
                            sx={{ width: '100%', maxWidth: 360, bgcolor: '#201F1F', color: "white" }}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                        >
                            <ListItemButton onClick={() => navigate("/profile")} >
                                <ListItemIcon>
                                    <AccountCircleRoundedIcon sx={{ color: "white", fontSize: 28 }} />
                                </ListItemIcon>
                                <ListItemText primary="Profile" />
                            </ListItemButton>
                            <ListItemButton onClick={() => navigate("/watchlater")}>
                                <ListItemIcon>
                                    <WatchLaterOutlinedIcon sx={{ color: "white", fontSize: 28 }} />
                                </ListItemIcon>
                                <ListItemText primary="Watch Later" />
                            </ListItemButton>
                            <ListItemButton onClick={() => navigate("/subscription")}>
                                <ListItemIcon>
                                    <SubscriptionsOutlinedIcon sx={{ color: "white", fontSize: 28 }} />
                                </ListItemIcon>
                                <ListItemText primary="Subscription" />
                            </ListItemButton>
                            <ListItemButton onClick={handleLogout}>
                                <ListItemIcon>
                                    <LogoutOutlinedIcon sx={{ color: "white", fontSize: 28 }} />
                                </ListItemIcon>
                                <ListItemText primary="Log Out" />
                            </ListItemButton>
                        </List>
                    </Popover>}
                </div>


            </div>
        </div>
    );
};

export default Header;
