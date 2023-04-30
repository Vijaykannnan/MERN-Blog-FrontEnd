import React, { useEffect, useState } from 'react'
import "./comment-form.css"
import img from "../../images/banner.jpg"
import axios from "axios"
import { format } from 'date-fns'
import baseUrl from "../helper"


export default function CommentForm({ postId }) {
    let [fetchComments, setFetchComments] = useState("")
    console.log("fetchComments", fetchComments.data);
    let [commentData, setCommentData] = useState({
        name: "",
        email: "",
        message: ""
    })

    async function validate(e) {
        e.preventDefault();
        //create an comment data to database
        try {
            await axios.post(`${baseUrl}/commentsData`, [{ commentdata: commentData }, { postCommentId: postId }])
        } catch (error) {
            throw error
        }
        setCommentData({
            name: "",
            email: "",
            message: ""
        })
    }

    useEffect(() => {

        //read an comment data from database
        try {
            axios.get(`${baseUrl}/fetchcommentsData`, { commentdata: commentData }).then(data => {
                // console.log(data);
                setFetchComments(data)
            })
        } catch (error) {
            throw error
        }
    }, [])
    return (
        <>
            <section className="comment-sec">
                <h1>Top Reviews⭐</h1>
                { fetchComments.data?.map((val, index) => {
                    {
                        if (postId === val.postCommentId) {
                            return <div key={ index } className="comment-views">
                                <img src={ img } alt="" />
                                <div>
                                    <div>
                                        <h2>{ val.username }</h2>
                                        <span>{ format(new Date(val.createdAt), 'dd-MM-yyyy') }</span>
                                    </div>

                                    <p>{ val.message }</p>
                                </div>

                            </div>
                        }
                    }
                    //mela map munnadi ? potrukan kandipah podu yananh un site loaad agii datas lam db la iruthu kondu vera late agutu so appom intha variable la onnum irukathu so undefined ah irukurah nallah page la error varuthu

                    //console.log(val);

                })
                }
            </section>
            <form action="" method="POST" className='comment-form' onSubmit={ validate }>
                <h1>Make An Comment📩</h1>
                <input type="text" name="usename" placeholder='UserName' value={ commentData.name } onChange={ (e) => { setCommentData({ ...commentData, name: e.target.value }) } } />
                <input type="type" name="email" placeholder='Email' value={ commentData.email } onChange={ (e) => { setCommentData({ ...commentData, email: e.target.value }) } } />
                <textarea placeholder="Message" name="message" rows="8" value={ commentData.message } onChange={ (e) => { setCommentData({ ...commentData, message: e.target.value }) } }></textarea>
                <button>Add It</button>
            </form>
        </>

    )
}
