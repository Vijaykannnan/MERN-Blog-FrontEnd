import React, { useState } from 'react'
import "./recentPost.css"
import img from "../../images/photo3.png"
import "./recentPost.css"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { SearchedDataAction } from "../reducer/reducer"
import baseUrl from "../helper"


export default function RecentPost({ datas, ownProp }) {

    let [text, setText] = useState("")
    let navigate = useNavigate();
    let dispatch = useDispatch()
    //to send an searched text to server routes file

    function searchedPage() {
        try {
            axios.get(`${baseUrl}/search/${text}`).then(val => {
                // navigate(`./searchedresult?post_id_form_recentPost:${val.data[0]._id}`);
                // console.log(val.data[0]);

                dispatch(SearchedDataAction(val))

                navigate("/searchedresult")

            })
        } catch (err) {
            console.log(err);
        }

    }

    async function validate(e) {
        e.preventDefault()
        searchedPage();
    }
    function Redirect() {
        navigate("ashdfgaskfg")
    }
    // console.log("recent:", datas);

    return (
        <div className="sidebar">
            { !ownProp ? <><br /><br /><br /><br /></> : "" }
            { ownProp ? <form action="/" method="POST" onSubmit={ validate }>
                <input type="text" placeholder="search" name="searchedText" onChange={ (e) => { setText(e.target.value) } } />
                <span style={ { fontWeight: "800", fontSize: "2rem", marginLeft: "-10px" } } onClick={ searchedPage }>&#8702;</span>
            </form> : "" }
            <div className='recent-post'>
                <h1>Recent Blog post</h1>

                { datas ? datas.map((item, index) => {
                    return <div className="recent-post-details" key={ index }>
                        <img src={ `${baseUrl}/uploads/` + item.userPhoto } />
                        <Link to={ `/` && "/singlepostcontent?post_id=" + item._id }><p > { item.postContent.slice(0, 50) }</p ></Link>
                    </div>
                }) : <h1>No Recent files</h1> }

                {/* <div className="recent-post-details">
                    <img src={ img } />
                    <h1>10 Biggest Problems Blogggers Face and How Tp Tackle Them</h1>
                </div> */}
            </div>

        </div >

    )
}
