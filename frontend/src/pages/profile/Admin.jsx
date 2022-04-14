import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import User from './User';
import "./profile.css";
import { AuthContext } from '../../App';
import "./profile.css";
const POSTS_URL = "/posts/"

export default function Admin() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    let { id } = useParams();
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([]);
    const storage = JSON.parse(localStorage.getItem('user'));
    const token = "Bearer " + JSON.parse(localStorage.getItem('token'));
    const userId = storage.id;
    const [data, setData] = useState('')
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
    return (
        <div className="profilePageContainer">
            <div className="profile">
                <div className="card">
                    <h2 className='profile-title'>Admin</h2>
                </div>
            </div>
            {users.map(u => (
                <User key={u.id} user={u} />
            ))}
        </div>
    );
}
