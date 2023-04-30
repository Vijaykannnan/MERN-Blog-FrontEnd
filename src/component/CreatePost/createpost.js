import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
// import "../Register/register.css"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios"
import baseUrl from "../helper"

function CreatePost() {
    let navigate = useNavigate()
    console.log("hii");
    let state = useSelector((val) => {
        console.log(val);
    })
    let sessionValue = "";

    let sessionStatefromReducer = useSelector((val) => {
        sessionValue = val;
    })

    useEffect(() => {
        if (!sessionValue.session) {
            navigate("/login")
        }
    }, [sessionValue.session])
    // let sessionStatefromReducer = useSelector((val) => {
    //     if (val.session) {
    //         // setRender(true)
    //         // setRender(true)
    //         return val.session.data.session.userInfo.username;

    //     } else {
    //         navigate("/")
    //         // setRender(false)

    //     }
    // })
    const [contentVal, setContentVal] = useState("");
    // console.log(contentVal);
    let content = contentVal.slice(3, -4)
    // console.log(cont
    const [postData, setPostData] = useState({
        title: "",
        userPhoto: "",
        userName: "",
        postImg: "",
        // content: contentVal
    })
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }]
        ]
    }
    const formats = [
        'header'
    ]
    // const inputRef = useRef()
    function allEnteredDatas(e) {
        setPostData({ ...postData, [e.target.name]: e.target.value })
        // console.log(e.target.value);

    }
    // function allEnteredDatasForFiles(e) {
    //     setPostData({userPhoto:e.target.files})
    //     // console.log(e.target.value);

    // }


    // console.log(data);
    // console.log(postData.postImg)
    // console.log(postData.userPhoto)
    async function validate(e) {
        e.preventDefault()

        const data = new FormData();
        data.append('title', postData.title);
        data.append('userPhoto', postData.userPhoto[0]);
        data.append('userName', postData.userName);
        data.append('postImg', postData.postImg[0]);
        data.append('content', content);


        console.log(postData);

        try {
            await axios.post(`${baseUrl}/createpost`, data).then(() => {
                navigate("/home")
            })

        } catch (e) {
            console.log("error for traverse an post datas");
        }
        setPostData({
            title: "",
            userPhoto: "",
            userName: "",
            postImg: "",
        })
        setContentVal("")
    }
    return (

        <div className="register">
            <br />
            <h1>Create Post</h1>
            <form action="/" method='POST' onSubmit={ validate } encType="multipart/form-data">
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" placeholder="Title" id="title" value={ postData.title } onChange={ allEnteredDatas } />
                </div>
                <div>
                    <label htmlFor="photo">User Photo</label>
                    <input type="file" id="photo" onChange={ (e) => setPostData({ ...postData, userPhoto: e.target.files }) } />
                </div>
                <div>
                    <label htmlFor="name">User Name</label>
                    <input type="text" name="userName" placeholder="Name" id="userName" value={ postData.userName } onChange={ allEnteredDatas } />
                </div>
                <div>
                    <label htmlFor="postImg">Post Img</label>
                    <input type="file" id="postImg" onChange={ (e) => setPostData({ ...postData, postImg: e.target.files }) } />
                </div>
                <div>
                    <label>Post Content</label>
                    <ReactQuill value={ contentVal } theme="snow" onChange={ (datas) => setContentVal(datas) } module={ modules } formats={ formats } />
                </div>
                <button>Create Post</button>
            </form>

        </div>

    )
}
export default CreatePost