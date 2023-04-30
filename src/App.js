import React from 'react'
import Header from "./component/Header/header"
import Content from "./component/main-content/content"
import Register from "./component/Register/register"
import Login from "./component/Login/login"
import CreatePost from "./component/CreatePost/createpost"
import SearchedResult from "./component/recentPost-sidebar/searchedresult"
import SinglePostContent from './component/main-content/single-post-content'
import Adminroute from "../src/component/AdminPanel/adminRoute"
import Adminpanel from './component/AdminPanel/adminpanel'
import Delete from './component/AdminPanel/delete'
import Editpost from "./component/AdminPanel/editpost"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={ <> <Header /> <Register /></> } />
                <Route path="/home" element={ <> <Header /> <Content /></> } />
                <Route path="/login" element={ <> <Header /> <Login /></> } />
                <Route path="/createpost" element={ <> <Header /> <CreatePost /></> } />
                <Route path="/searchedresult" element={ <><Header /><SearchedResult /> </> } />
                <Route path="/singlepostcontent" element={ <><Header headerRender="true" /><SinglePostContent /> </> } />
                <Route path="/adminpanel*" element={ <Adminroute /> } />
                <Route path="/delete" element={ <Delete /> } />
                <Route path="/editpost" element={ <Editpost /> } />




            </Routes>
        </Router>
    )
}
export default App