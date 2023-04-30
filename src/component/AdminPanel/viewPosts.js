import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
import { formatISO9075 } from 'date-fns'
import "./adminpanel.css"
import baseUrl from "../helper"

function Viewposts() {

    let [posts, setPosts] = useState("")
    useEffect(() => {
        axios.get(`${baseUrl}/viewposts`).then((data) => {
            // console.log(data);
            setPosts(data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    console.log("posts", posts);
    return (
        <div className="viewposts">
            <table className='viewpost-table'>
                <tr>
                    <th>Title</th>
                    <th>Userphoto</th>
                    <th>UserName</th>
                    <th>PostImg</th>
                    <th>PostContent</th>
                    <th>Date</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>

                { posts.data?.map((val, id) => {
                    return <tr key={ id }>
                        <td>{ val.title }</td>
                        {/* <td><img src={ require(`../../../../server/uploads/${val.userPhoto}`) } /></td> */ }
                        <td>{ val.userName }</td>
                        {/* <td><img src={ require(`../../../../server/uploads/${val.postImg}`) } /></td> */ }
                        <td>{ val.postContent }</td>
                        <td>{ formatISO9075(new Date(val.createdAt)) }</td>
                        <td><Link to={ `/editpost?edit_id=${val._id}` }>Edit</Link></td>
                        <td><Link to={ `/delete?post_del_id=${val._id}` }>Delete</Link></td>
                    </tr>
                }) }

            </table>
        </div>
    )
}

export default Viewposts