import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Feed from "./components/Feed";
import SearchResult from "./components/SearchResult";
import VideoDetails from "./components/VideoDetails";
import { AppContext } from "./context/contextApi";

import SignUp from "./components/SignUp";
import Layout from "./components/Layout";
import SignIn from "./components/SignIn";
import Subscription from "./components/Subscription"
import UpdatePassword from "./components/UpdatePassword";
import WatchLater from "./components/WatchLater";
import Profile from "./components/Profile"



const App = () => {
    return (
        <AppContext>

            <BrowserRouter>
                <div className="flex flex-col h-full">
                    <Routes>
                        <Route path="/feed" exact element={
                            <Layout>
                                <Feed />
                            </Layout>
                        }
                        />
                        <Route path="/watchlater" exact element={
                            <Layout>
                                <WatchLater />
                            </Layout>
                        }
                        />
            
                        <Route path="/" exact element={<SignUp />} />
                        <Route path="/signin" exact element={<SignIn />} />
                        <Route path="/profile" exact element={<Profile />}  />
                        <Route path="/subscription" exact element={<Subscription />} />
                        <Route path="/profile" exact element={<UpdatePassword />} />

                        <Route
                            path="/searchResult/:searchQuery"
                            element={
                                <Layout>
                                    <SearchResult />
                                </Layout>
                            }
                        />
                        <Route path="/video/:id" element={
                            <Layout>
                                <VideoDetails />
                            </Layout>
                        }
                        />
                    </Routes>
                </div>
            </BrowserRouter>
       </AppContext>
    );
};

export default App;
