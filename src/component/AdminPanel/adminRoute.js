import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreatePost from "./Admincreatepost"
import Adminpanel from "./adminpanel"
import Viewuser from "./viewUsers"
import ViewPosts from "./viewPosts"
import ViewComments from './viewComments'
import Rightside from './rightside'
function AdminRoute() {
    return (
        // <BrowserRouter>
        <Routes>
            {/* <Route path="/" element={ <Adminpanel /> } /> */ }
            <Route path="/" element={ <Adminpanel /> }>
                <Route path="" element={ <CreatePost /> } />
                <Route path="viewUser" element={ <Viewuser /> } />
                <Route path="viewpost" element={ <ViewPosts /> } />
                <Route path="viewcomments" element={ <ViewComments /> } />
            </Route>


            {/* <Route path="viewUser" element={}/>
                <Route path="viewpost" element={ } />
                <Route path="viewcomments" element={ } /> */}
            {/* <Route path="" element={}/> */ }

        </Routes>
        // </BrowserRouter>
    )
}

export default AdminRoute