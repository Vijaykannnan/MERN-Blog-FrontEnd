import React, { useState, useEffect } from 'react'
import "../Register/register.css"
import { useDispatch, useSelector } from 'react-redux'
import { LoginUserSession } from "../reducer/reducer"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import baseUrl from "../helper"


function Login() {
    let navigate = useNavigate("")
    let dispatch = useDispatch()


    let sessionValue = "";

    let sessionStatefromReducer = useSelector((val) => {
        sessionValue = val;
    })

    useEffect(() => {
        if (sessionValue.session) {
            navigate("/home")
        }
    }, [sessionValue.session])

    // let [sessionData, setSessionData] = useState("")
    let [loggedUser, setLoggedUser] = useState({
        email: "",
        password: ""
    })
    // console.log("sessionData", sessionData);
    async function loginValidate(e) {
        e.preventDefault()

        //post an login detailss to server
        try {
            await axios.post(`${baseUrl}/login`, {
                datas: loggedUser,
                // credentials: "include",
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    credentials: "include"
                }
            }).then((data) => {
                console.log("react-login", data);

                if (data.data.session.userInfo.role === "admin") {
                    // if (data.data.session.userInfo.role === "admin") {
                    navigate("/adminpanel")
                    // dispatch(LoginUserSession(data))
                    // }
                } else {
                    alert("successfully Logged! Visit Home")
                    navigate("/home")
                }
                dispatch(LoginUserSession(data))
                // navigate("/home")
                // console.log("document-cookie", document.cookie);
                // setSessionData("values")

            })

        } catch (e) {
            console.log(e);
        }

        // setLoggedUser({
        //     email: "",
        //     password: ""
        // })

    }


    return (
        // register la ulla css file ah ingaiyum, add panirukan so classname ah new ah mathamah ahula irukurah register nu name ey vachirukan
        < div className="register" >
            <br />
            {/* <h1>{ sessionData.username }</h1> */ }
            <h1>Sign In</h1>
            <form action="/" method='POST' onSubmit={ loginValidate }>
                <div>
                    <label htmlFor="mail">Email</label>
                    <input type="email" name="email" placeholder="abc@gmail.com" id="mail" value={ loggedUser.email } onChange={ (e) => { setLoggedUser({ ...loggedUser, email: e.target.value }) } } required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Password" id="password" value={ loggedUser.password } onChange={ (e) => { setLoggedUser({ ...loggedUser, password: e.target.value }) } } required />
                </div>
                <div>
                    <input type="checkbox" name="checkbox" id="check" />
                    <label htmlFor="check" className='checkbox'>Terms And Condition</label>
                </div>
                <button>Login</button>
            </form>
        </div >

    )
}
export default Login