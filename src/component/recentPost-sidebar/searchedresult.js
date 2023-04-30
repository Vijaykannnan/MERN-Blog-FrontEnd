import React, { useEffect, useState } from 'react'
import "../main-content/content.css"
// import img from "../../images/photo3.png"
import SideBar from "./recentpost"
import { formatISO9075 } from 'date-fns'
import { Link } from "react-router-dom"
// import axios from "axios"
import { useSelector } from 'react-redux'
import baseUrl from "../helper"


export default function Content() {
    let newState = useSelector((vals) => {
        return vals
        console.log("new state", vals);
    })

    console.log("new state", newState);

    return (
        <main>
            <section>
                { newState.fields.length != 0 ? newState.fields.map((item, index) => {

                    return <div className='blog-post' key={ { index } }>
                        <h1>{ item.title }</h1>
                        <div className='blog-post_profile'>

                            <div className="blog-post_profileDetails">
                                import baseUrl from "../helper"
                                <img src={ `${baseUrl}/uploads/` + item.userPhoto } alt="userphoto" />
                                <div>
                                    <h2>Gayane Vardanyan</h2>
                                    <p>{ formatISO9075(new Date(item.createdAt)) }</p>
                                </div>

                            </div>
                            <p className='published'>Published</p>
                        </div>
                        <div className='blog-post_content'>
                            <img src={ `${baseUrl}/uploads/` + item.postImg } alt="blogpost" />
                            <p>{ item.postContent.slice(0, 200) + "..." } <Link to={ "/singlepostcontent?post_id=" + item._id }>View more</Link></p>
                        </div>
                    </div>
                }) : <h1 style={ { margin: "5rem 5rem" } }>No Search Results found</h1> }


                {/* 
                <div className=' blog-post'>
                    <h1>10 Biggest Problems Blogggers Face and How Tp Tackle Them</h1>
                    <div className='blog-post_profile'>

                        <div className="blog-post_profileDetails">
                            <img src={ img } />
                            <div>
                                <h2>Gayane Vardanyan</h2>
                                <p>March 7,2020</p>
                            </div>

                        </div>
                        <p className='published'>Published</p>
                    </div>
                    <div className='blog-post_content'>

                        <img src={ img } />
                        <p>Surfing some of the biggest blogs ever happen today nigrht for anybody the thing is most happen anywhere at anytoime from an local Surfing some of the biggest blogs ever happen today nigrht for anybody the thing is most happen anywhere at anytoime from an local guySurfing some of the biggest blogs ever happen today nigrht for anybody the thing is most happen anywhere at anytoime from an local guySurfing some of the biggest blogs ever happen today nigrht for anybody the thing is most happen anywhere at anytoime from an local guyguy</p>
                    </div>
                </div> */}

            </section>
            <SideBar datas={ newState.fields } ownProp={ false } />

        </main >
    )
}
