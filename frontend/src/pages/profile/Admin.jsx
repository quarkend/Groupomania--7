import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import User from './User';
import "./profile.css"
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../App';
import UpdateProfilePhoto from './UpdateProfilePhoto';

import UpdateProfileUsername from './UpdateProfileUsername';
import { Fragment } from 'react';
import Post from './../../components/post/Post';
// import Mesenger from "../../components/mesenger/Mesenger";


const POSTS_URL = "/posts/"
const UPDATE = "/users/"
const DELETE_ACCOUNT_URL = "/users/delete/"
export default function Admin({ submit, username }) {
    const auth = useContext(AuthContext)
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [post, setPost] = useState([]);
    let { id } = useParams();
    let history = useHistory();
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([]);
    const storage = JSON.parse(localStorage.getItem('user'));
    const token = "Bearer " +JSON.parse(localStorage.getItem('token'));
    const userId = storage.id;
    const userCredentials = JSON.parse(localStorage.getItem('user'))
    const [data, setData] = useState('')
    const { handleSubmit, register } = useForm()



    
   
    async function getUserData() {
        const URL = `${"/users/"}/${userId}`
        const data = await fetch(URL, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        const response = await data.json()
        setData(response)
        console.log(response)
    }
    useEffect(() => {
        getUserData()
       
    }, [])
    async function getPostData() {
        const URL = `${POSTS_URL}`
        const data = await fetch(URL, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        const response = await data.json()
        setData(response)
        console.log(response)
    }
    useEffect(() => {
        getPostData()
    }, [])
 
    useEffect(() => {
        axios.get(`/users/${id}`,
            {
                headers:
                    { "Authorization": token }
            }).then((response) => {
                setUser(response.data)
                console.log(response.data)
                localStorage.setItem(' setLisuserIdX', JSON.stringify(response.data));
            });
    }, [id, token]);
    // useEffect(() => {
    //     axios.get(`/users`,
    //         {
    //             headers: { "Authorization": token}
    //         }).then((response) => {
    //             setUsers(response.data)
    //             localStorage.setItem(' setusers', JSON.stringify(response.data));
    //         });
    // }, [id]);
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users`,
                {
                    headers:
                        { "Authorization": token }
                }
            );
            setUsers(res.data);
            localStorage.setItem('userAount', JSON.stringify(res.data));
            console.log(res.data)
        };
        fetchUser();
    }, [token]);
    useEffect(() => {
        const fetchPost = async () => {
            const res = await axios.get("/users/" + id + "/posts/",
                {
                    headers:
                        { "Authorization": token }
                }
            );
            setPost(res.data);
            localStorage.setItem('userposts', JSON.stringify(res.data));
            console.log(res.data)
        };
        fetchPost();
    }, [token]);
 
    return (
        <div className="profilePageContainer">
            <div className="profile">
                <div className="card">
                <h2 className='profile-title'>Admin</h2>
                    {/* <h4 className="detail"> {user.username}</h4> */}
                    {/* <form className="signup-form margin" onSubmit={submit}  >
                        <div className="form-group">
                           <label htmlFor="username"> {storage.username || "Username"}</label> 
                            <input className="add-input" type="text" name="username" id="username" placeholder={username === undefined ? 'username...' : username} ref={register} />
                        </div>
                    </form> */}
                    {/* <button onClick={() => { updateUsename(user.id) }}>updateUsename</button> */}
                    {/* <button className="fas fa-user-slash white fa-2x"  onClick={() => { history.push("/deleteuser/" + id) }}>Supprimerff</button> */}
               
                </div>
            </div>
            {users.map(u => (
                <User key={u.id} user={u} />
            ))}
         
        </div>
    );
}
