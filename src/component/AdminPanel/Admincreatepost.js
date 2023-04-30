import React, { useState } from 'react'
// import "../Register/register.css"
import { useNavigate } from "react-router-dom"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios"
import baseUrl from "../helper"
function CreatePost() {
    let navigate = useNavigate("")
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
                navigate("/adminpanel/viewpost")
            })
        } catch (e) {
            console.log("error for traverse an post datas");
        }

    }
    return (
        <div className="register createpost-admin">
            <br /><br />
            <h1>Create Post</h1>
            <form action="/" method='POST' onSubmit={ validate } enctype="multipart/form-data">
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" placeholder="Title" id="title" value={ postData.title } onChange={ allEnteredDatas } style={ { width: "140%" } } />
                </div>
                <div>
                    <label htmlFor="photo">User Photo</label>
                    <input type="file" id="photo" onChange={ (e) => setPostData({ ...postData, userPhoto: e.target.files }) } style={ { width: "140%" } } />
                </div>
                <div>
                    <label htmlFor="name">User Name</label>
                    <input type="text" name="userName" placeholder="Name" id="userName" value={ postData.userName } onChange={ allEnteredDatas } style={ { width: "140%" } } />
                </div>
                <div>
                    <label htmlFor="postImg">Post Img</label>
                    <input type="file" id="postImg" onChange={ (e) => setPostData({ ...postData, postImg: e.target.files }) } style={ { width: "140%" } } />
                </div>
                <div>
                    <label>Post Content</label>
                    <ReactQuill value={ contentVal } theme="snow" onChange={ (datas) => setContentVal(datas) } module={ modules } formats={ formats } style={ { width: "140%" } } />
                </div>
                <button>Create Post</button>
            </form>
        </div>

    )
}
export default CreatePost