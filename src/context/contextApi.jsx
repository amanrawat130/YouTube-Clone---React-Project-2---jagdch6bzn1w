import React, { createContext, useState, useEffect } from "react";
import { fetchDataFromApi } from "../utils/api";

export const Context = createContext();
export const AppContext = (props) => {

  // Load the initial state from local storage or set default values
  const initialState = JSON.parse(localStorage.getItem("appContextData")) || {
    loading: false,
    searchResults: [],
    selectedCategory: "New",
    mobileMenu: false,
    userToken: "",
    userData: [],
    watchLater: [],
  };

  const [state, setState] = useState(initialState);

  const [loading, setLoading] = useState(false);

  // <--- snake Bar ----> 

  const [snakeBar, setSnakeBar] = useState({
    text: "",
    shouldDisplayText: false,
  });

  const setSnakeBarMessage = (message) => {
    setSnakeBar((prevData) => ({
      ...prevData,
      text: message,
    }));
  };

  const setShouldDisplaySignInMessage = (value) => {
    setSnakeBar((prevData) => ({
      ...prevData,
      shouldDisplayText: value,
    }));
  };

  // <----- nsakeBar end -----> 





  useEffect(() => {

    localStorage.setItem("appContextData", JSON.stringify(state));
  }, [state.userdata, state]);

  useEffect(() => {
    console.log("andr aya fetch selected category useEffect")
    fetchSelectedCategoryData(state.selectedCategory);
  }, [state.selectedCategory]);



  // <----- search and Category data api's functions ----> 

  const setSelectedCategory = (name) => {
    setState({
      ...state,
      selectedCategory: name
    });
  }

  const fetchSelectedCategoryData = (query) => {
    console.log("andr aya fetch selected category  ")
    if (state.selectedCategory === "New" || state.selectedCategory === "Watch Later") {
      console.log("return from context")
      return;
    }
    setLoading(true);
    console.log("return nhi chla  aya fetch selected category", state.selectedCategory)

    fetchDataFromApi(state.selectedCategory)
      .then((response) => {
        const videos = response.data;
        setState({
          ...state,
          searchResults: videos
        });


      })
      .catch((error) => {
        setLoading(false);
      });

    setLoading(false);
  };




  // < ------- handle login and registration ----> 

  const handleUserRegistrationAndLogin = async (response, check) => {


    if (check === "login") {

      if (response.status === "success" && response.token) {
        setState({
          ...state,
          userToken: response.token,
          userData: response.data,
        });

      } else {
        console.error("Registration failed");
      }
    } else if (check === "register") {

      if (response.status === "success" && response.token) {
        setState({
          ...state,
          userToken: response.token,
          userData: response.data.user,
        });

      } else {
        console.error("Registration failed");
      }

    }
    
  }


  // <--------- Logout Function -----> 

  const logout = () => {

    setState({
      ...state,
      searchResults: [],
      selectedCategory: "New",
      mobileMenu: false,
      userToken: "",
      userData: [],
      watchLater: [],
    });

    // Clear data from local storage
    localStorage.clear();

  };

  // <------- watch later ------->

  const setWatchList = (data) => {
    setState({
      ...state,
      watchLater: data
    });
  }

  const addRemoveFromWatchLater = async (showId, userToken) => {

    const url = "https://academics.newtonschool.co/api/v1/ott/watchlist/like";

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`, // Set the Authorization header with the user token
          'projectId': 'f104bi07c490',
        },
        body: JSON.stringify({ showId }), // Include the showId in the request body
      });

      if (response.ok) {
        updateWatchLaterList(userToken);
      } else {
        console.error('Error adding/removing show from watchlist');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };


  const updateWatchLaterList = async (userToken) => {

    const url = "https://academics.newtonschool.co/api/v1/ott/watchlist/like"

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'projectId': 'f104bi07c490',
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        const shows = responseData.data.shows;
        setWatchList(shows);
      } else {
        console.error('Error fetching watchlist');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };






  return (
    <Context.Provider
      value={{
        handleUserRegistrationAndLogin,
        snakeBar,
        setSnakeBarMessage,
        setShouldDisplaySignInMessage,
        
        userToken: state.userToken,
        loading,
        setLoading,
        searchResults: state.searchResults,
        setSelectedCategory,
        selectedCategory: state.selectedCategory,
        // userName: state.userData ? state.userData.name : null,
        userName: state.userData ? state.userData.name : "Aman",
        logout,
        addRemoveFromWatchLater,
        updateWatchLaterList,
        watchList: state.watchLater,
        userData: state.userData,
        storageState: state,
        setStorageState: setState,
        
      }}
    >
      {props.children}
    </Context.Provider>
  );
};