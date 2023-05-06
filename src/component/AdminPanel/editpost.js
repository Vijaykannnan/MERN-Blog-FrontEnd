import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
// import "../Register/register.css"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios"
import { Link, useSearchParams } from "react-router-dom"
import baseUrl from "../helper"


function EditPost() {
    let navigate = useNavigate()
    // console.log("hii");
    let [searchParams, setSearchParams] = useSearchParams();
    let postParams = searchParams.get("edit_id");

    // let [editData, setEditData] = useState("")
    const [postId, setPostId] = useState("")
    const [title, setTitle] = useState("");
    const [userPhoto, setUserPhoto] = useState("");
    const [userName, setUserName] = useState("")
    const [postImg, setPostImg] = useState("")
    const [contentVal, setContentVal] = useState("");
    useEffect(() => {
        axios.post(`${baseUrl}/editpost`, { postParams }).then((data) => {
            // console.log("data fetched succesfully");
            setPostId(data.data._id)
            setTitle(data.data.title)
            setUserPhoto(data.data.userPhoto)
            setUserName(data.data.userName)
            setPostImg(data.data.postImg)
            setContentVal(data.data.postContent)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    // let state = useSelector((val) => {
    //     console.log(val);
    // })
    // let sessionValue = "";

    // let sessionStatefromReducer = useSelector((val) => {
    //     sessionValue = val;
    // })

    // useEffect(() => {
    //     if (!sessionValue.session) {
    //         navigate("/login")
    //     }
    // }, [sessionValue.session])
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
    // console.log("edit data", editData);


    // console.log(contentVal);
    let content = contentVal.slice(3, -4)
    // console.log("contentVal", content);
    // console.log(postId);
    // console.log(cont
    const [postData, setPostData] = useState({

        title: "",
        userPhoto: "",
        userName: "",
        postImg: "",
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
        setTitle()
        setUserName()
        // setEditData()
        setPostData({ ...postData, [e.target.name]: e.target.value })
        // console.log(e.target.value);

    }
    // function allEnteredDatasForFiles(e) {
    //     setPostData({userPhoto:e.target.files})
    //     // console.log(e.target.value);

    // }
    // function ChangeContentVal(e) {
    //     setEditData()
    //     setContentVal(e.target.value)
    // }

    // console.log(data);
    // console.log(postData.postImg)
    // console.log(postData.userPhoto)
    async function validate(e) {
        e.preventDefault()

        const data = new FormData();
        data.append('postId', postId)
        data.append('title', postData.title);
        data.append('userPhoto', postData.userPhoto[0]);
        data.append('userName', postData.userName);
        data.append('postImg', postData.postImg[0]);
        data.append('content', content);

        // console.log(postData);

        // console.log(data);
        // let [allData,setAllDatas]


        try {
            await axios.post(`${baseUrl}/validateEditPost`, data)
        } catch (e) {
            console.log("error for traverse an edit post datas");
        }

    }
    return (

        <div className="register editPost">
            <br />
            <h1>Edit Post</h1>
            <form action="/" method='POST' onSubmit={ validate } encType="multipart/form-data">
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" placeholder="Title" id="title" value={ title && title } onChange={ allEnteredDatas } />
                </div>
                <div>
                    <label htmlFor="photo">User Photo</label>
                    <img src={ userPhoto && `${baseUrl}/uploads/${userPhoto}` } alt="imges" />
                    <input type="file" id="photo" onChange={ (e) => setPostData({ ...postData, userPhoto: e.target.files }) } />
                    {/* (e) => setPostData({ ...postData, userPhoto: e.target.files }) */ }
                </div>
                <div>
                    <label htmlFor="name">User Name</label>
                    <input type="text" name="userName" placeholder="Name" id="userName" value={ userName && userName } onChange={ allEnteredDatas } />
                </div>
                <div>
                    <label htmlFor="postImg">Post Img</label>
                 <img src={ postImg && `${baseUrl}/uploads/${postImg}` } alt="imges" />
                    <input type="file" id="postImg" onChange={ (e) => setPostData({ ...postData, postImg: e.target.files }) } />
                </div>
                <div>
                    <label>Post Content</label>
                    <ReactQuill value={ contentVal && contentVal } theme="snow" onChange={ (datas) => { setContentVal(datas) } } module={ modules } formats={ formats } />
                </div>
                <button>Update Post</button>
            </form>

        </div>

    )
}
export default EditPost
