import React, { useEffect, useState } from 'react'
import "./content.css"
import img from "../../images/photo3.png"
import Banner from "../../images/banner.jpg"
import SideBar from "../recentPost-sidebar/recentpost"
import { formatISO9075 } from 'date-fns'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { ReacentaAddedItems } from "../reducer/reducer"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Login from '../Login/login'
import baseUrl from "../helper"


export default function Content() {

    let [forRender, setRender] = useState(false)
    let navigate = useNavigate()
    // let sessionStatefromReducer = sessionStatefromReducer = useSelector((val) => {
    //     if (val.session) {
    //         // setRender(true)
    //         // setRender(true)
    //         return val.session.data.session.userInfo.username;

    //     } else {
    //         navigate("/login")
    //         // setRender(false)

    //     };
    let sessionValue = "";

    let sessionStatefromReducer = useSelector((val) => {
        sessionValue = val;
        console.log("sessionvcontetn", val);
    })

    useEffect(() => {
        if (!sessionValue.session) {
            navigate("/login")
        }
    }, [sessionValue.session])



    //     // console.log("useSelstor", val);

    // })
    let dispatch = useDispatch()
    let [fetchedData, setFetchedData] = useState("")
    useEffect(() => {
        axios.get(`${baseUrl}/fetchdPosts`, { credentials: "include" }).then((data) => {
            setFetchedData(data)
            console.log("content page", data);
            //this recent added items in distributiing in all page when neccessary for recent itmes simply use an useSelector hook to fetch it
            dispatch(ReacentaAddedItems(data))
            console.log("content", data);
        }).catch((err) => {
            console.log(err);
        })
    }, [])


    // // console.log("session", sessionStorage.getItem("token"));
    // useEffect(() => {
    //     // function getSessionStorageOrDefault(token, defaultValue) {
    //     const stored = sessionStorage.getItem("token");
    //     // if (!stored) {
    //     //     return defaultValue;
    //     // }
    //     // return JSON.parse(stored);
    //     console.log(stored);
    //     //   }
    // }, [])


    // console.log("fecth ", fetchedData.data);
    let datas = fetchedData.data;
    // console.log("datas", datas);
    return (
        <main>
            <h1 style={ { margin: " 20px 30px" } }>{ sessionValue.session ? "Hello " + sessionValue.session.data.session.userInfo.username : "" }</h1>
            <section>
                { datas?.map((item, index) => {

                    return <div className='blog-post' key={ index }>

                        <h1>{ item.title }</h1>
                        <div className='blog-post_profile'>

                            <div className="blog-post_profileDetails">
                                <img src={ `${baseUrl}/uploads/` + item.userPhoto } alt="userphoto" />
                                <div>
                                    <h2>{ item.userName }</h2>
                                    <p>{ formatISO9075(new Date(item.createdAt)) }</p>
                                </div>

                            </div>
                            <p className='published'>Published</p>
                        </div>
                        <div className='blog-post_content'>
                            <img src={ `${baseUrl}/uploads/` + item.postImg } alt="blogpost" />
                            <p>{ item.postContent.slice(0, 200) + "..." }  <Link to={ "/singlepostcontent?post_id=" + item._id }>View more</Link></p>


                        </div>
                    </div>
                }) }



                {/* <div className=' blog-post'>
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

            <SideBar datas={ fetchedData.data } ownProp={ true } />

        </main>

    )
}
