import React from 'react'
import "./rightbar.css"
import axios from 'axios'
import Online from "../online/Online";
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './../../App';
export default function Rightbar({ user}) {
    
    const storage = JSON.parse(localStorage.getItem('user'));
    const token = "Bearer " +JSON.parse(localStorage.getItem('token'));
    const id = storage.id;






    const HomeRightbar = () => {
   
        const [Users, setUsers] = useState([]);
        useEffect(() => {
            let componentMounted = true;
            let abortController = new AbortController(); 
            const fetchData = async () => { axios.get("http://localhost:8800/api/users").then((res) => {
                if(componentMounted) {
                    setUsers(res.data);
                  }
                console.log(res.data)
            })
        }

            // axios.get(`|http://http://localhost:8800/api/posts/byId/${id}`).then((res) => {
            //     setUsers(res.data)
            //     console.log(res.data)
            // })
        
              fetchData();
              return () => {
               componentMounted = false;
               abortController.abort();
              }
        }, []);
        return (
            <div>
                <div className="eventContainer">
                    <img className="eventImg" src="assets/gift.png" alt="" />
                    <span className="eventText"> <b>{storage.username}</b></span>
                </div>
                <img className="rightbarAd" src="assets/ad.png" alt="" />
                <h4 className="rightbarTitle">On line friends</h4>
                <ul className="rightbarColleagueList">
                    {Users.map((u) => (
                        <Online key={u.id} user={u} />
                    ))}
                </ul>
            </div>
        );
    };
    const ProfileRightbar = () => {
        const storage = JSON.parse(localStorage.getItem('user'));
        const id = storage.userId;
        let token = "Bearer " + storage.token;
        const [Users, setUsers] = useState([]);
        const [posts, setPosts] = useState([]);
        useEffect(() => {
            let componentMounted = true;
            let abortController = new AbortController(); 
            const fetchData = async () => {
                axios.get(`/users/${id}`,
                {
                    headers:
                        { "Authorization": token }
                }
            ).then((res) => {
                if(componentMounted) {
                    setUsers(res.data);
                  }
                console.log(res.data)
            })
     
    };
    fetchData();
    return () => {
     componentMounted = false;
     abortController.abort();
    }
          
        
        
        }, [id, token]);
        return (
            <div>
                <h4 className="rightbarTitle">User Information </h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                         <span className="rightbarInfoValue">{storage.city}</span> 
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">{storage.from}</span> 
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">Singel</span>
                        <h4 className="rightbarTitle">User friernds </h4>
                        <div className="rightbarFollowings">
                    
                     
                            <div className="rightbarFollowing">
                                <img src={"http://localhost:8800/images/"  + storage.profilePicture} alt="" className="rightbarFollowingImg" />
                          
                                <span className="rightbarFollowingName"> {storage.username}</span>
                            </div> 
          
                        </div>
                    </div>
                </div>
            </div>)
    }
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
             {user ? <HomeRightbar /> : <ProfileRightbar />}  
                {/* <ProfileRightbar /> */}
                {/* <HomeRightbar /> */}
         
            </div>
        </div>
    );
}
  