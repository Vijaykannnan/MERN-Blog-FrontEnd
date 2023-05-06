import React, { useEffect } from 'react'
import "./adminpanel.css"
import { Link, useNavigate, Outlet } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { ReacentaAddedItems } from '../reducer/reducer'
import AdminCreatePost from "./Admincreatepost"
import AdminRoute from "./adminRoute"
import baseUrl from "../helper"
import axios from "axios"
function Adminpanel() {
    let navigate = useNavigate("")
    let dispatch = useDispatch("")
    // let sessionValue = "";

    async function logout() {

        axios.get(`${baseUrl}/logout`, {
            headers: {
                'Content-Type': 'application/json',
                credentials: "include"
            }
        }).then((data) => {
            console.log("session destroyed");
            // console.log("content", data);
//             window.location.reload();
            navigate("/");
        }).catch((err) => {
            console.log(err);
        })
    }

    let sessionValue = "";
    let sessionStatefromReducer = useSelector((val) => {
        sessionValue = val;
    })

    useEffect(() => {
        //ethuku itha ReacentAddItems() annupurana ithulah than session iruku annupu onnum ila so simple la "data" nu send panni ennuku thevayanah session ah eduthurukan
        dispatch(ReacentaAddedItems("data"))
        if (!sessionValue.session) {
            navigate("/login")
        }
    }, [sessionValue.session])


    return (
        <section>
            <div className="adminpanel">
                <div className="leftside">
                    <h1>DashBoard🖐️</h1>
                    <Link to="">Create Post</Link>
                    <Link to="viewUser">View Users</Link>
                    <Link to="viewpost">View Post</Link>
                    <Link to="viewcomments">View Comments</Link>
                    <Link onClick={ logout }>Logout</Link>

                </div>
                <div className="rightside">
                    <Outlet />
                </div>
            </div>
        </section>
    )
}


export default Adminpanel;
