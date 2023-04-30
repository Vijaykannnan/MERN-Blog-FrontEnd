import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from "react-router-dom"
import { format } from 'date-fns'
import SideBar from "../recentPost-sidebar/recentpost"
import axios from "axios"
import { useSelector } from 'react-redux'
import CommentForm from "./comment-form"
import { ReacentaAddedItems } from "../reducer/reducer"
import baseUrl from "../helper"


function SinglePostContent() {
    let navigate = useNavigate("")
    let sessionValue = "";

    let sessionStatefromReducer = useSelector((val) => {
        sessionValue = val;
        console.log("sessionsingle", val);
    })

    useEffect(() => {
        if (!sessionValue.session) {
            navigate("/login")
        }
    }, [sessionValue.session])



    //use selctor to fetch an recent post content
    let recentPostState = useSelector((val) => {
        //console.log("recent post val form reducer", val);
        return val.fields
    })

    let [searchParams, setSearchParams] = useSearchParams();
    let postIdParams = searchParams.get("post_id")
    let [singlePostValues, setSinglePostValues] = useState("")
    // let allData = []

    useEffect(() => {

        axios.post(`${baseUrl}/singlepostcontent`, { post_id: postIdParams }).then((val) => {
            setSinglePostValues(val.data)
            // ReacentaAddedItems(val.data)
            // allData.push(val)
        }).catch((e) => {
            console.log("error from singlepostcontent");
        })
    }, [postIdParams])
    // console.log("singlepostcontent", singlePostValues);
    // console.log("all data", allData);
    // console.log("all data", allData[0].data);


    return (

        <main>
            <section>
                <div className='blog-post'>
                    <div className='blog-post_profile'>
                        <div className="blog-post_profileDetails">
                            <img src={ `${baseUrl}/uploads/` + singlePostValues.userPhoto } alt="userphoto" />
                            <div>
                                <h2>{ singlePostValues.userName }</h2>
                                <p>{ singlePostValues.createdAt }</p>
                            </div>

                        </div>
                        <p className='published'>Published</p>
                    </div>
                    <div className='blog-post_content'>
                        <img src={ `${baseUrl}/uploads/` + singlePostValues.postImg } alt="blogpost" />
                        <p>{ singlePostValues.postContent }</p>
                    </div>
                </div>

            </section>
            <SideBar datas={ recentPostState } ownProp={ false } />

            <section calssName="form-sec">
                <CommentForm postId={ postIdParams } />
            </section>
        </main>


    )
}


export default SinglePostContent;