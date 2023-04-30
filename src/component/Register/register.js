
import baseUrl from "../helper"
import React, { useState } from 'react'
import "./register.css"
import { useNavigate } from 'react-router-dom';
import axios from "axios"

function Register() {
    // const [name, setName] = useState("")
    // const [number, setNumber] = useState("")
    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")
    let Navigate = useNavigate();
    const [allValues, setAllValues] = useState({
        username: "",
        number: "",
        email: "",
        password: ""
    })
    async function Validate(e) {
        e.preventDefault()
        // Navigate("/login")
        //pass value to backend using api
        try {
            await axios.post(`${baseUrl}/register`,
                {
                    data: allValues,
                }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
        }
        catch (err) {
            console.log(err);
        }




        // try {
        //     await axios.post("http://localhost:8080/post",
        //         {
        //             data: allValues,
        //         })
        // }
        // catch (err) {
        //     console.log(err);
        // }
        // const response = await fetch("http://127.0.0.1:8080/postdata", {
        //     method: "post",
        //     body: JSON.stringify(allValues),
        //     headers: { 'Content-Type': 'application/json' }
        // })
        // if (response.status === 200) {
        //     console.log("success");
        // } else {
        //     console.log("failed");
        // }

        setAllValues({
            username: "",
            number: "",
            email: "",
            password: ""
        })

    }
    function makeValues(e) {
        setAllValues({ ...allValues, [e.target.name]: e.target.value })
    }

    return (
        <div className="register">
            <br />
            <h1>Sign Up</h1>
            <form action="/" method='POST' onSubmit={ Validate }>
                <div>
                    <label htmlFor="name">UserName</label>
                    <input type="text" name="username" placeholder="Username" id="name" value={ allValues.username } onChange={ makeValues } />
                </div>
                <div>
                    <label htmlFor="mobile">Mobile</label>
                    <input type="number" name="number" placeholder="+91" id="mobile" value={ allValues.number } onChange={ makeValues } required />
                </div>
                <div>
                    <label htmlFor="mail">Email</label>
                    <input type="email" name="email" placeholder="abc@gmail.com" id="mail" value={ allValues.email } onChange={ makeValues } required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Password" id="password" value={ allValues.password } onChange={ makeValues } required />
                </div>
                <div>
                    <input type="checkbox" name="checkbox" id="check" />
                    <label htmlFor="check" className='checkbox'>Terms And Condition</label>
                </div>
                <button>Register</button>
            </form>
        </div>

    )
}
export default Register