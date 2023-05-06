import React, { useEffect } from 'react'
import "./header.css"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import baseUrl from "../helper"


function Header({ headerRender }) {

    let state = useSelector((val) => {
        console.log("val sess", val);
        if (val.session) {
            return val.session.data.session
        }

        // console.log(val);
    })

    console.log("state", state);
    // }

    let navigate = useNavigate()
    async function logout() {

        axios.get(`${baseUrl}/logout`, {
            headers: {
                'Content-Type': 'application/json',
                credentials: "include"
            }
        }).then((data) => {
            console.log("session destroyed");
            // console.log("content", data);
            window.location.reload(true);
//             navigate("/");
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <nav>
            <div className='logo'>
                <h1>Logo</h1>
            </div>
            <div className="menus">
                <ul>
                    { state ? <li><Link to="/home">Home</Link></li> : "" }
                    { state ? <li><Link to="/createpost">Create Post</Link></li> : "" }
                    { !state ? <li><Link to="/login">Login</Link></li> : "" }
                    { !state ? <li><Link to="/">Register</Link></li> : "" }
                    { state ? !headerRender && <li onClick={ logout }><Link>logout</Link></li> : "" }

                    {/*                     
                    <li><Link to="/home">Home</Link></li>
                    { state ? <li><Link to="/createpost">Create Post</Link></li> : "" }
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/">Register</Link></li>
                    <li onClick={ logout }><Link>logout</Link></li> */}

                </ul>
            </div>
        </nav>
    )
}
export default Header
