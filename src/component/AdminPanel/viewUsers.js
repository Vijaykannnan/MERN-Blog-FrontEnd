import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
import { formatISO9075 } from 'date-fns'
import baseUrl from "../helper"



function ViewUsers() {
    // function deleteUsers() {
    //     axios.get("http://localhost:8000/de")
    // }
    let [users, setUsers] = useState("")
    useEffect(() => {
        axios.get(`${baseUrl}/viewusers`).then((data) => {
            // console.log(data);
            setUsers(data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    //fro delete an users
    // useEffect(() => {
    //     axios.get("http://localhost:8000/vie").then((data) => {
    //         // console.log(data);
    //         setUsers(data)
    //     }).catch((err) => {
    //         console.log(err);
    //     })
    // }, [])
    // console.log("users", users.data);
    // let params = useParams();
    // console.log("params", params);

    return (
        <div className="viewusers">
            <table>
                <tr>
                    <th>Username</th>
                    <th>Number</th>
                    <th>Email</th>
                    <th>Date</th>
                    <th>Role</th>
                    <th>Delete</th>
                </tr>
                { users.data?.map((val) => {
                    return <tr>
                        <td>{ val.username }</td>
                        <td>{ val.number }</td>
                        <td>{ val.email }</td>
                        <td>{ formatISO9075(new Date(val.createdAt)) }</td>
                        <td>{ val.role ? "admin" : "user" }</td>
                        <td><Link to={ `/delete?del_user_id=${val._id}` }>Delete</Link ></td>
                    </tr>
                }) }

            </table>
        </div >
    )
}

export default ViewUsers