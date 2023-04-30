import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
import "./adminpanel.css"
import { formatISO9075 } from 'date-fns'
import baseUrl from "../helper"


function Viewcomments() {

    let [comments, setComments] = useState("")
    useEffect(() => {
        axios.get(`${baseUrl}/viewcomments`).then((data) => {
            // console.log(data);
            setComments(data)
            // setPostCommentId(data.data.postCommentId)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    // let [postCommentId, setPostCommentId] = useState("")
    // // comments.data && comments.data.postCommentId
    // console.log(comments);
    let [posts, setPosts] = useState("")

    useEffect(() => {
        axios.get(`${baseUrl}/viewposts`).then((data) => {
            // console.log(data);
            setPosts(data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    // console.log("fetchedcomments", postCommentId);
    return (
        <div className="viewcomments">
            <table className='viewcomment-table'>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Title</th>
                    <th>PostImg</th>
                    <th>Message</th>
                    <th>Date</th>
                    <th>Delete</th>
                </tr>
                { comments.data?.map((commentVal, id) => {
                    return <tr key={ id }>
                        <td>{ commentVal.username }</td>
                        <td>{ commentVal.email }</td>
                        { posts.data?.map((postVal) => {
                            if (commentVal.postCommentId === postVal._id) {
                                return <td>{ postVal.title }</td>
                            }
                        }) }
                        {/* { posts.data?.map((postVal) => {
                            if (commentVal.postCommentId === postVal._id) {
                                return <td><img src={ require("../../../../server/uploads/" + postVal.postImg) } /></td>
                            }
                        }) } */}
                        {/* <td>{ val.postCommentId }</td> */ }
                        {/* <td>PostImg</td> */ }
                        <td>{ commentVal.message }</td>
                        <td>{ formatISO9075(new Date(commentVal.createdAt)) }</td>
                        <td><Link to={ `/delete?del_comment_id=${commentVal._id}` }>Delete</Link></td>
                    </tr>
                }) }

            </table>
        </div>
    )
}

export default Viewcomments