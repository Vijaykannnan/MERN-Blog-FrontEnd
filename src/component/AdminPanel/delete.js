import React, { useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from "react-router-dom"
import axios from "axios"
import baseUrl from "../helper"
export default function Delete() {
    // let params = useParams();
    // console.log("params", params);
    let [searchParams, setSearchParams] = useSearchParams();
    let userParams = searchParams.get("del_user_id");
    let postParams = searchParams.get("post_del_id");
    let commentParams = searchParams.get("del_comment_id")
    // console.log(userParams);
    let navigate = useNavigate("")

    useEffect(() => {
        if (userParams) {
            axios.post(`${baseUrl}/deleteuserfromadmin`, { userParams }).then(() => {
                navigate("/adminpanel/viewpost")
            }).catch((err) => {
                console.log(err);
            })
        }


    }, [])


    useEffect(() => {
        if (postParams) {
            axios.post(`${baseUrl}/deletepostfromadmin`, { postParams }).then(() => {
                navigate("/adminpanel/viewpost")
            }).catch((err) => {
                console.log(err);
            })

        }

    }, [])

    useEffect(() => {
        if (commentParams) {
            axios.post(`${baseUrl}/deletecommentfromadmin`, { commentParams }).then(() => {
                navigate("/adminpanel/viewcomments")
            }).catch((err) => {
                console.log(err);
            })

        }

    }, [])
    // return (
    //     <div>deleted successfully</div>
    // )
}
